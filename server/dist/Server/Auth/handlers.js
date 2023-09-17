"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshHandler = exports.resetPasswordHandler = exports.resetCodeHandler = exports.resetStartHandler = exports.verifyEmail = exports.signup = exports.signin = void 0;
const database_1 = __importDefault(require("../database"));
const email_1 = require("../email");
const generators_1 = require("../utilities/generators");
const redis_1 = require("../database/redis");
const index_1 = require("../email/index");
function isValidEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
}
function isPasswordStrong(password) {
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
}
const generateTokens = (username, email, name, mobile, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const loggedinData = {
        username,
        email,
        name,
        mobile
    };
    const token = yield (0, generators_1.generateAuthToken)(loggedinData, { expiresIn: "15m" });
    const refreshToken = yield (0, generators_1.generateAuthToken)({ audience: userId }, { expiresIn: "1w" });
    const refreshTokens = yield (0, database_1.default)(`select validRefreshTokens from registeredUsers where userId = '${userId}';`);
    let currentTokens = { tokens: [] };
    if (refreshTokens.length > 0 && refreshTokens[0] !== null) {
        if (refreshTokens[0].validRefreshTokens &&
            refreshTokens[0].validRefreshTokens.tokens) {
            currentTokens = {
                tokens: [...refreshTokens[0].validRefreshTokens.tokens],
            };
        }
    }
    currentTokens = { tokens: [...currentTokens.tokens, refreshToken] };
    (0, database_1.default)(`UPDATE registeredUsers SET validRefreshTokens = '${JSON.stringify(currentTokens)}' WHERE userId = '${userId}';`);
    return { token, refreshToken };
});
const signin = (user, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const databaseData = yield (0, database_1.default)(`select * from registeredUsers where email = '${user.toLowerCase()}' or userName = '${user.toLowerCase()}';`);
        if (databaseData.length === 0) {
            throw new Error("The user is not in the database.");
        }
        const userData = databaseData[0];
        if (!(yield (0, generators_1.comparePasswords)(password, userData.userPassword))) {
            throw new Error("Incorrect password provided.");
        }
        const { userId, fullName, username, email, mobile } = userData;
        if (userData.verifiedEmail !== 1) {
            const session = yield setUpEmailSession({
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
        const { token, refreshToken } = yield generateTokens(username, email, fullName, mobile, userId);
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
    }
    catch (error) {
        throw error;
    }
});
exports.signin = signin;
// name: {type: GraphQLString},
//     success: {type: GraphQLBoolean},
//     session: {type: GraphQLString}
const signup = ({ username, email, mobile, password, name, }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validEmail = isValidEmail(email);
        const passwordStrength = isPasswordStrong(password);
        if (!validEmail)
            throw new Error("The email you have entered is invalid");
        if (!passwordStrength)
            throw new Error("The password must be eight characters long, contain atleast 1 uppercase, lowercase, number and a special character !#?()$%£");
        const userId = (0, generators_1.generateRandomAlphanumeric)(10);
        const passHash = yield (0, generators_1.hashPassword)(password);
        const query = `insert into registeredUsers(userId, fullName, username, email, mobile, userPassword, validRefreshTokens) values(\
        '${userId}', '${name.trim()}', '${username
            .toLowerCase()
            .trim()}', '${email.toLowerCase().trim()}', '${mobile ? mobile.toLowerCase().trim() : ""}', '${passHash}', '[]')`;
        yield (0, database_1.default)(query);
        const session = yield setUpEmailSession({ name, email, userId });
        return { requireConfirmation: {
                name,
                success: true,
                session,
            } };
    }
    catch (error) {
        throw error;
    }
});
exports.signup = signup;
const setUpEmailSession = ({ userId, name, email, }) => __awaiter(void 0, void 0, void 0, function* () {
    const code = (0, generators_1.generateRandomAlphanumeric)(6).toUpperCase();
    const session = (0, generators_1.generateRandomAlphanumeric)(16);
    yield (0, index_1.sendConfirmCode)({ email, name, code });
    (0, redis_1.redisAddString)(session, JSON.stringify({
        code,
        userId,
    }));
    return session;
});
const verifyEmail = (session, code) => __awaiter(void 0, void 0, void 0, function* () {
    const findCode = yield (0, redis_1.redisGetString)(session);
    if (!findCode) {
        throw Error("The session you have sent is invalid.");
    }
    const data = JSON.parse(findCode);
    if (code !== data.code) {
        throw new Error("The code you sent is incorrect");
    }
    const m = (yield (0, database_1.default)(`select * from registeredUsers where userId = '${data.userId}';`));
    console.log(m);
    const { userId, fullName, username, email, mobile } = m[0];
    const { refreshToken, token } = yield generateTokens(username, email, fullName, mobile, userId);
    (0, database_1.default)(`UPDATE registeredUsers SET validRefreshTokens = '{"tokens":"[${refreshToken}]"}', verifiedEmail = 1 WHERE userId = '${userId}';`);
    (0, redis_1.redisDeleteString)(session);
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
});
exports.verifyEmail = verifyEmail;
const resetStartHandler = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const dbUser = yield (0, database_1.default)(`SELECT * FROM registeredUsers WHERE username = '${user}' or email = '${user}';`);
    if (dbUser.length === 0) {
        throw new Error("The user was not found in the database");
    }
    const { userId, email, fullName, mobile, username } = dbUser[0];
    const code = (0, generators_1.generateRandomAlphanumeric)(6).toUpperCase();
    const session = (0, generators_1.generateRandomAlphanumeric)(16);
    yield (0, email_1.sendResetCode)(code, email, "", fullName);
    (0, redis_1.redisAddString)(session, JSON.stringify({
        code,
        userId,
        email,
        name: fullName,
        mobile,
        username,
    }));
    return { session };
});
exports.resetStartHandler = resetStartHandler;
const resetCodeHandler = (session, code) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const g = yield (0, redis_1.redisGetString)(session);
        if (!g) {
            throw new Error("The session is either expired or the invalid");
        }
        const data = JSON.parse(g);
        if (data.code !== code) {
            throw new Error("The code you have sent is incorrect");
        }
        const newSession = (0, generators_1.generateRandomAlphanumeric)(24);
        (0, redis_1.redisAddString)(newSession, JSON.stringify(data));
        (0, redis_1.redisDeleteString)(session);
        return { session: newSession };
    }
    catch (error) {
        throw error;
    }
});
exports.resetCodeHandler = resetCodeHandler;
const resetPasswordHandler = (session, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sessionData = yield (0, redis_1.redisGetString)(session);
        if (!sessionData)
            throw new Error("This session is invalid or expired.");
        const { userId, username, email, name, mobile } = JSON.parse(sessionData);
        const hash = yield (0, generators_1.hashPassword)(password);
        yield (0, database_1.default)(`
      update registeredUsers set userPassword = '${hash}' where userId = '${userId}';
    `);
        const { token, refreshToken } = yield generateTokens(username, email, name, mobile, userId);
        (0, redis_1.redisDeleteString)(session);
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
    }
    catch (error) {
        throw error;
    }
});
exports.resetPasswordHandler = resetPasswordHandler;
const refreshHandler = (userId, refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, database_1.default)(`select * from registeredUsers where userId = "${userId}";`);
        const { username, email, fullName, mobile, validRefreshTokens } = user[0];
        if (!validRefreshTokens.tokens.includes(refreshToken)) {
            throw new Error('The refresh token you are using is invalid');
        }
        const tokenData = {
            username,
            email,
            name: fullName,
            mobile
        };
        const token = yield (0, generators_1.generateAuthToken)(tokenData, { expiresIn: "15m" });
        return { token };
    }
    catch (error) {
        throw error;
    }
});
exports.refreshHandler = refreshHandler;
