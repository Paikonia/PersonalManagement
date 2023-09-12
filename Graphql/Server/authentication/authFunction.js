const makeDatabaseCalls = require("../database/mysqlIndex");
const {
  generateRandomAlphanumeric,
  hashPassword,
  comparePasswords,
  generateAuthToken,
} = require("../utilities/generators");
const {
  redisAddString,
  redisDeleteString,
  redisGetString,
} = require("../database/redis");
const { sendCode } = require("../email/sendEmail");

function isValidEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailRegex.test(email);
}

const login = async ({ user, password }) => {
  try {
    const databaseData = await makeDatabaseCalls(
      `select * from registeredUsers where email = '${user.toLowerCase()}' or userName = '${user.toLowerCase()}';`
    );
    if (databaseData.length === 0) {
      throw new Error("The user is not in the database.");
    }
    const userData = databaseData[0];
    if (!(await comparePasswords(password, userData.userPassword))) {
      throw new Error("Incorrect password provided.");
    }

    const { userId, fullName, username, email, mobile } = userData;

    if (userData.verifiedEmail !== 1) {
      const session = await setUpEmailSession({
        name: fullName,
        email,
        userId,
      });
      return {
        requireConfirmation: {
          session,
          success: true,
          name: fullName,
        },
      };
    }

    const token = await generateAuthToken(
      { userId, username, email },
      { expiresIn: "15m" }
    );
    const refreshToken = await generateAuthToken(
      { username, userId, email, mobile },
      { expiresIn: "1w" }
    );

    makeDatabaseCalls(
      `UPDATE registeredUsers SET validRefreshTokens = JSON_ARRAY_APPEND(
  validRefreshTokens->'$.tokens',
  '$', 
  '${refreshToken}'
) WHERE userId = '${userId}';`
    );

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
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// name: {type: GraphQLString},
//     success: {type: GraphQLBoolean},
//     session: {type: GraphQLString}

const signup = async ({ username, email, mobile, password, name }) => {
  try {
    const userId = generateRandomAlphanumeric(10);
    const passHash = await hashPassword(password);
    const query = `insert into registeredUsers(userId, fullName, username, email, mobile, userPassword, validRefreshTokens) values(\
        '${userId}', '${name}', '${username.toLowerCase()}', '${email.toLowerCase()}', '${
      mobile ? mobile.toLowerCase() : ""
    }', '${passHash}', '[]')`;
    await makeDatabaseCalls(query);
    const session = await setUpEmailSession({ name, email, userId });
    return {
      name,
      success: true,
      session,
    };
  } catch (error) {
    throw error;
  }
};

const setUpEmailSession = async ({ userId, name, email }) => {
  const code = generateRandomAlphanumeric(6).toUpperCase();
  const session = generateRandomAlphanumeric(16);
  await sendCode({ code, name, email });
  redisAddString(
    session,
    JSON.stringify({
      code,
      userId,
    })
  );
  return session;
};

const confirmEmail = async ({ session, code }) => {
  const findCode = await redisGetString(session);
  if (!findCode) {
    throw Error("The session you have sent is invalid.");
  }
  const data = JSON.parse(findCode);

  if (code !== data.code) {
    throw new Error("The code you sent is incorrect");
  }

  const m = await makeDatabaseCalls(
    `select * from registeredUsers where userId = '${data.userId}';`
  );
  const { userId, fullName, username, email, mobile } = m[0];
  const token = await generateAuthToken(
    { userId, username, email },
    { expiresIn: "15m" }
  );
  const refreshToken = await generateAuthToken(
    { username, userId, email, mobile },
    { expiresIn: "1w" }
  );

  makeDatabaseCalls(
    `UPDATE registeredUsers SET validRefreshTokens = '{"tokens":"[${refreshToken}]"}', verifiedEmail = 1 WHERE userId = '${userId}';`
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

module.exports = { login, signup, confirmEmail };
