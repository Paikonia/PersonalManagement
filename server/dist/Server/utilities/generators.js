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
exports.decryptText = exports.encryptText = exports.verifyAuthToken = exports.generateAuthToken = exports.comparePasswords = exports.hashPassword = exports.generateRandomAlphanumeric = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const crypto_1 = __importDefault(require("crypto"));
require("dotenv").config();
const generateRandomAlphanumeric = (length) => {
    const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"; //abcdefghijklmnopqrstuvwxyz
    let randomString = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        randomString += charset[randomIndex];
    }
    return randomString;
};
exports.generateRandomAlphanumeric = generateRandomAlphanumeric;
const hashPassword = (password) => __awaiter(void 0, void 0, void 0, function* () {
    const saltRounds = 10;
    const hashedPassword = yield bcrypt_1.default.hash(password, saltRounds);
    return hashedPassword;
});
exports.hashPassword = hashPassword;
const comparePasswords = (enteredPassword, hashedPassword) => __awaiter(void 0, void 0, void 0, function* () {
    const passwordsMatch = yield bcrypt_1.default.compare(enteredPassword, hashedPassword);
    return passwordsMatch;
});
exports.comparePasswords = comparePasswords;
const generateAuthToken = (user, param) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const secretKey = process.env.JSON_KEY;
        const token = jsonwebtoken_1.default.sign(user, secretKey, param);
        return token;
    }
    catch (error) {
        const err = {
            name: "Token " + error.name,
            message: error.message,
            status: 401,
        };
        throw err;
    }
});
exports.generateAuthToken = generateAuthToken;
const verifyAuthToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const secretKey = process.env.JSON_KEY; // Replace with a strong secret key
        const data = (yield jsonwebtoken_1.default.verify(token, secretKey));
        return data;
    }
    catch (error) {
        console.error(error);
        const err = {
            name: 'Token ' + error.name,
            message: error.message,
            status: 401,
        };
        throw err;
    }
});
exports.verifyAuthToken = verifyAuthToken;
const generateRandomBytes = (len) => {
    return crypto_1.default.randomBytes(len); // 32 bytes for AES-256
};
const encryptText = (text) => {
    const secretKey = process.env.SECRET_KEY_ENC;
    const iv = generateRandomBytes(16);
    const cipher = crypto_1.default.createCipheriv("aes-256-cbc", Buffer.from(secretKey), Buffer.from(iv));
    let encryptedText = cipher.update(text, "utf8", "hex");
    encryptedText += cipher.final("hex");
    return encryptedText;
};
exports.encryptText = encryptText;
// Decrypt AES-256 encrypted text using a secret key and IV.
const decryptText = (encryptedText) => {
    const secretKey = process.env.SECRET_KEY_ENC;
    const iv = generateRandomBytes(16);
    const decipher = crypto_1.default.createDecipheriv("aes-256-cbc", Buffer.from(secretKey), Buffer.from(iv));
    let decryptedText = decipher.update(encryptedText, "hex", "utf8");
    decryptedText += decipher.final("utf8");
    return decryptedText;
};
exports.decryptText = decryptText;
