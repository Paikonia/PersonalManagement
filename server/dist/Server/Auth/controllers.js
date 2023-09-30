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
Object.defineProperty(exports, "__esModule", { value: true });
exports.signoutController = exports.refreshController = exports.resetPasswordController = exports.resetCodeController = exports.resetStartController = exports.verifyUserEmailController = exports.signupController = exports.signinController = void 0;
const handlers_1 = require("./handlers");
const generators_1 = require("../utilities/generators");
const functions_1 = require("./functions");
const AuthConstants_1 = require("../Constants/AuthConstants");
const signinController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        if (!body.user ||
            !body.password ||
            body.user === "" ||
            body.password === "") {
            throw new Error("You must provide both a username and password to make this request");
        }
        const data = yield (0, handlers_1.signin)(body.user, body.password);
        res.json(data);
    }
    catch (error) {
        next(error);
    }
});
exports.signinController = signinController;
const signupController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const { data, message } = (0, functions_1.verifyUserData)(body);
        if (message !== "") {
            const missigParts = AuthConstants_1.AUTHERRORS.MissingData;
            missigParts.message = message;
            throw missigParts;
        }
        const { password, confirmPassword, firstName, lastName, username, email, mobile, } = data;
        if (password !== confirmPassword) {
            throw AuthConstants_1.AUTHERRORS.PasswordMissmatch;
        }
        const session = yield (0, handlers_1.signup)({
            firstName,
            lastName,
            username,
            email,
            mobile,
            password,
        });
        res.json({ session });
    }
    catch (error) {
        next(error);
    }
});
exports.signupController = signupController;
const verifyUserEmailController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { session, code } = req.body;
        if (!(session && session.trim() !== "" && code && code.trim() !== "")) {
            const missingData = AuthConstants_1.AUTHERRORS.MissingData;
            missingData.message = "Both the session and code are required!";
            throw missingData;
        }
        const ret = yield (0, handlers_1.verifyEmail)(session, code);
        res.json(ret);
    }
    catch (error) {
        next(error);
    }
});
exports.verifyUserEmailController = verifyUserEmailController;
const resetStartController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.body.user;
        if (!(user && user.trim() !== "")) {
            const missingData = AuthConstants_1.AUTHERRORS.MissingData;
            missingData.message = "This request requires either a username or email address!";
            throw missingData;
        }
        const g = yield (0, handlers_1.resetStartHandler)(user);
        res.json(g);
    }
    catch (error) {
        next(error);
    }
});
exports.resetStartController = resetStartController;
const resetCodeController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { session, code } = req.body;
        if (!(session && session.trim() !== "" && code && code.trim() !== "")) {
            const missingData = AuthConstants_1.AUTHERRORS.MissingData;
            missingData.message = "Both the session and code are required!";
            throw missingData;
        }
        const data = yield (0, handlers_1.resetCodeHandler)(session, code);
        res.json(data);
    }
    catch (error) {
        next(error);
    }
});
exports.resetCodeController = resetCodeController;
const resetPasswordController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { session, password, confirmPassword } = req.body;
        if (password !== confirmPassword) {
            throw AuthConstants_1.AUTHERRORS.PasswordMissmatch;
        }
        const result = yield (0, handlers_1.resetPasswordHandler)(session, password);
        res.json(result);
    }
    catch (error) {
        next(error);
    }
});
exports.resetPasswordController = resetPasswordController;
const refreshController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const data = (yield (0, generators_1.verifyAuthToken)(body.refreshToken));
        const result = yield (0, handlers_1.refreshHandler)(data.audience, body.refreshToken);
        res.json(result);
    }
    catch (error) {
        next(error);
    }
});
exports.refreshController = refreshController;
const signoutController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { refreshToken } = req.body;
        const data = yield (0, generators_1.verifyAuthToken)(refreshToken);
        const { audience } = data;
        const result = yield (0, handlers_1.signoutHandler)(audience, refreshToken);
        res.json(result);
    }
    catch (error) {
        next(error);
    }
});
exports.signoutController = signoutController;
