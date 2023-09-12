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
exports.refreshController = exports.resetPasswordController = exports.resetCodeController = exports.resetStartController = exports.verifyUserEmailController = exports.signupController = exports.signinController = void 0;
const handlers_1 = require("./handlers");
const generators_1 = require("../utilities/generators");
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
        const { name, username, email, mobile, password, confirmPassword } = req.body;
        if (!(name &&
            name.trim() !== "" &&
            username &&
            username.trim() !== "" &&
            email &&
            email.trim() !== "" &&
            password &&
            password.trim() !== "")) {
            throw new Error("The fields name, username, email, password, confirmPassword are required");
        }
        if (password !== confirmPassword) {
            throw new Error("The password do not match.");
        }
        const session = yield (0, handlers_1.signup)({ name, username, email, mobile, password });
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
            throw new Error("Both the session and code are required!");
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
            throw new Error("The password you have entered do not match");
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
