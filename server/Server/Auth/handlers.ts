import makeQueries from "../database";
import { sendResetCode } from "../email";

import {
  generateRandomAlphanumeric,
  hashPassword,
  comparePasswords,
  generateAuthToken,
} from "../utilities/generators";
import {
  redisAddString,
  redisDeleteString,
  redisGetString,
} from "../database/redis";
import { sendConfirmCode } from "../email/index";
import { AUTHERRORS } from "../Constants/AuthConstants";

const isValidEmail = (email: string) => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailRegex.test(email);
};

const isPasswordStrong = (password: string) => {
  if (password.length < 8) {
    return false;
  }

  if (!/[A-Z]/.test(password)) {
    return false;
  }

  if (!/[a-z]/.test(password)) {
    return false;
  }

  if (!/\d/.test(password)) {
    return false;
  }

  if (!/[!@#$%^&*]/.test(password)) {
    return false;
  }

  return true;
};

const generateTokens = async (
  username: string,
  email: string,
  name: string,
  mobile: string,
  userId: string
) => {
  const loggedinData = {
    username,
    email,
    name,
    mobile,
  } as unknown as LoggedinData;
  const token = await generateAuthToken(loggedinData, { expiresIn: "15m" });
  const refreshToken = await generateAuthToken(
    { audience: userId } as unknown as LoggedinData,
    { expiresIn: "1w" }
  );

  const refreshTokens = await makeQueries(
    `select validRefreshTokens from registeredUsers where userId = '${userId}';`
  );
  let currentTokens: { tokens: any[] } = { tokens: [] };
  if (refreshTokens.length > 0 && refreshTokens[0] !== null) {
    if (
      refreshTokens[0].validRefreshTokens &&
      refreshTokens[0].validRefreshTokens.tokens
    ) {
      currentTokens = {
        tokens: [...refreshTokens[0].validRefreshTokens.tokens],
      };
    }
  }
  currentTokens = { tokens: [...currentTokens.tokens, refreshToken] };
  makeQueries(
    `UPDATE registeredUsers SET validRefreshTokens = '${JSON.stringify(
      currentTokens
    )}' WHERE userId = '${userId}';`
  );

  return { token, refreshToken };
};

export const signin = async (user: string, password: string) => {
  try {
    const databaseData = await makeQueries(
      `select * from registeredUsers where email = '${user.toLowerCase()}' or userName = '${user.toLowerCase()}';`
    );
    if (databaseData.length === 0) {
      throw AUTHERRORS.MissingUser;
    }
    const userData = databaseData[0];

    if (!(await comparePasswords(password, userData.userPassword))) {
      throw AUTHERRORS.IncorrectPassword;
    }
    const {
      userId,
      firstName,
      lastName,
      username,
      email,
      mobile,
      validRefreshTokens,
    } = userData;
    if (userData.verifiedEmail !== 1) {
      const name = firstName + " " + lastName;
      const session = await setUpEmailSession({
        userId,
        name,
        email,
        validRefreshTokens,
      });
      return {
        requireConfirmation: {
          session,
          success: true,
          name: firstName + " " + lastName,
        },
      };
    }
    console.log({token, refreshToken})
    const { token, refreshToken } = await generateTokens(
      username,
      email,
      firstName + " " + lastName,
      mobile,
      userId
    );

    return {
      userToken: token,
      user: {
        name: firstName + " " + lastName,
        username,
        email,
        mobile,
      },
      refreshToken,
      requireConfirmation: null,
    };
  } catch (error) {
    throw error;
  }
};

export const signup = async ({
  username,
  email,
  mobile,
  password,
  firstName,
  lastName,
}: RegisterUser) => {
  try {
    const validEmail = isValidEmail(email);
    const passwordStrength = isPasswordStrong(password);

    if (!validEmail) throw AUTHERRORS.InvalidEmail;
    if (!passwordStrength) throw AUTHERRORS.PasswordCriteria;

    const userId = generateRandomAlphanumeric(10);
    const passHash = await hashPassword(password);

    const query = `insert into registeredUsers(userId, firstName, lastName, username, email, mobile, userPassword, validRefreshTokens) values(\
        '${userId}', '${firstName.trim().toUpperCase()}', '${lastName
      .trim()
      .toUpperCase()}', 
        '${username.toLowerCase().trim()}', '${email.toLowerCase().trim()}', '${
      mobile ? mobile.toLowerCase().trim() : ""
    }', '${passHash}', '{"tokens": []}')`;
    await makeQueries(query);
    const session = await setUpEmailSession({
      name: firstName,
      email,
      userId,
      validRefreshTokens: {
        tokens: [],
      },
    });
    return {
      requireConfirmation: {
        firstName,
        success: true,
        session,
      },
    };
  } catch (error) {
    throw error;
  }
};

const setUpEmailSession = async ({
  userId,
  name,
  email,
  validRefreshTokens,
}: {
  userId: string;
  name: string;
  email: string;
  validRefreshTokens: { tokens: Array<string> };
}) => {
  try {
    const code = generateRandomAlphanumeric(6).toUpperCase();
    const session = generateRandomAlphanumeric(16);

    sendConfirmCode(email, name, code);
    redisAddString(
      session,
      JSON.stringify({
        code,
        userId,
        validRefreshTokens,
      })
    );
    return session;
  } catch (e) {
    console.error(e);
  }
};

export const verifyEmail = async (session: string, code: string) => {
  const findCode = await redisGetString(session);
  if (!findCode) throw AUTHERRORS.InvalidSession

  const data = JSON.parse(findCode);

  if (code !== data.code) throw AUTHERRORS.IncorrectCode

  const m = (await makeQueries(
    `select * from registeredUsers where userId = '${data.userId}';`
  )) as any[];
  const { userId, fullName, username, email, mobile } = m[0];

  const { refreshToken, token } = await generateTokens(
    username,
    email,
    fullName,
    mobile,
    userId
  );
  const validRefreshTokens = { tokens: [refreshToken] };

  makeQueries(
    `UPDATE registeredUsers SET validRefreshTokens = '${JSON.stringify(
      validRefreshTokens
    )}', verifiedEmail = 1 WHERE userId = '${userId}';`
  );
  redisDeleteString(session);
  return {
    userToken: token,
    user: {
      name: fullName,
      username,
      email,
      mobile,
    },
    refreshToken,
    requireConfirmation: null,
  };
};

export const resetStartHandler = async (user: string) => {
  const dbUser = await makeQueries(
    `SELECT * FROM registeredUsers WHERE username = '${user}' or email = '${user}';`
  );
  if (dbUser.length === 0) throw AUTHERRORS.MissingUser

  const { userId, email, fullName, mobile, username } = dbUser[0];
  
  const code = generateRandomAlphanumeric(6).toUpperCase();
  
  const session = generateRandomAlphanumeric(16);
  
  await sendResetCode(code, email, "", fullName);
  
  redisAddString(
    session,
    JSON.stringify({
      code,
      userId,
      email,
      name: fullName,
      mobile,
      username,
    })
  );
  return { session };
};

export const resetCodeHandler = async (session: string, code: string) => {
  try {
    const g = await redisGetString(session);
    if (!g) throw AUTHERRORS.InvalidSession

    const data = JSON.parse(g);
    
    if (data.code !== code) throw AUTHERRORS.IncorrectCode

    const newSession = generateRandomAlphanumeric(24);
    
    redisAddString(newSession, JSON.stringify(data));
    
    redisDeleteString(session);
    
    return { session: newSession };
  } catch (error) {
    throw error;
  }
};

export const resetPasswordHandler = async (
  session: string,
  password: string
) => {
  try {
    const sessionData = await redisGetString(session);
    if (!sessionData) throw AUTHERRORS.InvalidSession;
    const { userId, username, email, name, mobile } = JSON.parse(sessionData);
    
    const hash = await hashPassword(password);

    await makeQueries(`
      update registeredUsers set userPassword = '${hash}' where userId = '${userId}';
    `);

    const { token, refreshToken } = await generateTokens(
      username,
      email,
      name,
      mobile,
      userId
    );
    
    redisDeleteString(session);
    
    return {
      userToken: token,
      user: {
        name,
        username,
        email,
        mobile,
      },
      refreshToken,
      requireConfirmation: null,
    };
  } catch (error) {
    throw error;
  }
};

export const refreshHandler = async (userId: string, refreshToken: string) => {
  try {
    const user = await makeQueries(
      `select * from registeredUsers where userId = "${userId}";`
    );

    const { username, email, fullName, mobile, validRefreshTokens } = user[0];

    if (!validRefreshTokens.tokens.includes(refreshToken)) throw AUTHERRORS.IncorrectRefreshToken

    const tokenData = {
      username,
      email,
      name: fullName,
      mobile,
    } as unknown as LoggedinData;
    
    const token = await generateAuthToken(tokenData, { expiresIn: "15m" });
    
    return { token };
  } catch (error) {
    throw error;
  }
};

export const signoutHandler = async (userId: string, refreshToken: string) => {
  try {
    const refreshTokens = await makeQueries(
      `select validRefreshTokens from registeredUsers where userId = '${userId}';`
    );
    if (refreshTokens[0].validRefreshTokens.tokens.includes(refreshToken)) {
      const newRefreshTokens =
        refreshTokens[0].validRefreshTokens.tokens.filter(
          (token: string) => refreshToken !== token
        );
      const update = `UPDATE registeredUsers SET validRefreshTokens = '{"tokens":${JSON.stringify(
        newRefreshTokens
      )}}', verifiedEmail = 1 WHERE userId = '${userId}';`;
      makeQueries(update);
      return {}
    }else{
      return {}
    }
  } catch (error) {
    throw error;
  }
};
