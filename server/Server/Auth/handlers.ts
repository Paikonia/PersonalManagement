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
import { isConditionalExpression } from "typescript";

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
      console.log(refreshTokens[0].validRefreshTokens.tokens);
      currentTokens = {
        tokens: [...refreshTokens[0].validRefreshTokens.tokens],
      };
    }
  }
  currentTokens = { tokens: [...currentTokens.tokens, refreshToken] };
  console.log(currentTokens.tokens.join(""));
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
      throw new Error("The user is not in the database.");
    }
    const userData = databaseData[0];

    if (!(await comparePasswords(password, userData.userPassword))) {
      throw new Error("Incorrect password provided.");
    }

    const { userId, firstName, lastName, username, email, mobile } = userData;

    if (userData.verifiedEmail !== 1) {
      const session = await setUpEmailSession({
        name: firstName + " " + lastName,
        email,
        userId,
      });
      return {
        requireConfirmation: {
          session,
          success: true,
          name: firstName + " " + lastName,
        },
      };
    }

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

// name: {type: GraphQLString},
//     success: {type: GraphQLBoolean},
//     session: {type: GraphQLString}

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

    if (!validEmail) throw new Error("The email you have entered is invalid");
    if (!passwordStrength)
      throw new Error(
        "The password must be eight characters long, contain atleast 1 uppercase, lowercase, number and a special character !#?()$%£"
      );

    const userId = generateRandomAlphanumeric(10);
    const passHash = await hashPassword(password);

    const query = `insert into registeredUsers(userId, firstName, lastName, username, email, mobile, userPassword, validRefreshTokens) values(\
        '${userId}', '${firstName.trim()}', '${lastName.trim()}', '${username
      .toLowerCase()
      .trim()}', '${email.toLowerCase().trim()}', '${
      mobile ? mobile.toLowerCase().trim() : ""
    }', '${passHash}', '[]')`;
    await makeQueries(query);
    const session = await setUpEmailSession({ name: firstName, email, userId });
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
}: {
  userId: string;
  name: string;
  email: string;
}) => {
  const code = generateRandomAlphanumeric(6).toUpperCase();
  const session = generateRandomAlphanumeric(16);
  await sendConfirmCode({ email, name, code });
  redisAddString(
    session,
    JSON.stringify({
      code,
      userId,
    })
  );
  return session;
};

export const verifyEmail = async (session: string, code: string) => {
  const findCode = await redisGetString(session);
  if (!findCode) {
    throw Error("The session you have sent is invalid.");
  }
  const data = JSON.parse(findCode);

  if (code !== data.code) {
    throw new Error("The code you sent is incorrect");
  }

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
  if (dbUser.length === 0) {
    throw new Error("The user was not found in the database");
  }
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
    if (!g) {
      throw new Error("The session is either expired or the invalid");
    }
    const data = JSON.parse(g);
    if (data.code !== code) {
      throw new Error("The code you have sent is incorrect");
    }
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
    if (!sessionData) throw new Error("This session is invalid or expired.");
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

    if (!validRefreshTokens.tokens.includes(refreshToken)) {
      throw new Error("The refresh token you are using is invalid");
    }
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
    }
  } catch (error) {
    throw error;
  }
};
