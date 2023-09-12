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
exports.redisGetString = exports.redisDeleteString = exports.redisAddString = void 0;
const { createClient } = require("redis");
const redisClient = createClient();
const redisAddString = (key, value) => {
    redisClient.set(key, value);
};
exports.redisAddString = redisAddString;
const redisDeleteString = (key) => {
    return redisClient.del(key);
};
exports.redisDeleteString = redisDeleteString;
const redisGetString = (key) => __awaiter(void 0, void 0, void 0, function* () {
    return yield redisClient.get(key);
});
exports.redisGetString = redisGetString;
exports.default = redisClient;
