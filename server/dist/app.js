"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = __importDefault(require("./Server/database/redis"));
const index_1 = __importDefault(require("./index"));
index_1.default.listen(process.env.PORT, () => {
    redis_1.default.connect();
    console.log(`App listening on port ${process.env.PORT}!`);
});
