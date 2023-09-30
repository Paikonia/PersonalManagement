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
exports.getUserDataMiddleWare = void 0;
const generators_1 = require("../utilities/generators");
const database_1 = __importDefault(require("../database"));
const AuthConstants_1 = require("../Constants/AuthConstants");
const getUserDataMiddleWare = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authHeader = req.headers["authorization"];
        if (authHeader) {
            const token = authHeader.split(" ")[1];
            if (!token) {
                next(AuthConstants_1.AUTHERRORS.InvalidTokenFormat);
            }
            const userData = (yield (0, generators_1.verifyAuthToken)(token));
            const userIds = yield (0, database_1.default)(`select userId from registeredUsers where username = '${userData.username}'`);
            if (userIds.length === 0) {
                const error = {
                    name: 'Invalid user',
                    message: 'The user you are logged in as is not in our database',
                    status: 404
                };
                throw error;
            }
            const user = Object.assign(Object.assign({}, userData), { userId: userIds[0].userId });
            if (req.method === "GET") {
                req.headers.user = JSON.stringify(user);
            }
            if (req.method === "POST" ||
                req.method === "PATCH" ||
                req.method === "PUT" ||
                req.method === "DELETE") {
                const body = req.body;
                req.body = { user, data: body };
            }
        }
        next();
    }
    catch (error) {
        next(error);
    }
});
exports.getUserDataMiddleWare = getUserDataMiddleWare;
