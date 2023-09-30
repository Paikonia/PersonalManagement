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
exports.makeQueriesWithParams = void 0;
const mysql2_1 = require("mysql2");
const dotenv_1 = require("dotenv");
const MySqlErrors_1 = __importDefault(require("./MySqlErrors"));
(0, dotenv_1.config)();
const pool = (0, mysql2_1.createPool)({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});
const makeQueries = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const f = (0, mysql2_1.format)(query);
    return new Promise((resolve, reject) => {
        pool.query(f, (error, results, fields) => {
            if (error) {
                console.error(error);
                reject((0, MySqlErrors_1.default)(error));
                return;
            }
            resolve(results);
        });
    });
});
const makeQueriesWithParams = (query, params) => __awaiter(void 0, void 0, void 0, function* () {
    const f = (0, mysql2_1.format)(query);
    return new Promise((resolve, reject) => {
        pool.query(f, params, (error, results, fields) => {
            if (error) {
                reject((0, MySqlErrors_1.default)(error));
                return;
            }
            resolve(results);
        });
    });
});
exports.makeQueriesWithParams = makeQueriesWithParams;
exports.default = makeQueries;
