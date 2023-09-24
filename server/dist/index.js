"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./Server/tasks/routes"));
const routes_2 = __importDefault(require("./Server/budget/routes"));
const routes_3 = __importDefault(require("./Server/expenses/routes"));
const routes_4 = __importDefault(require("./Server/notes/routes"));
const dotenv_1 = __importDefault(require("dotenv"));
const routes_5 = __importDefault(require("./Server/Auth/routes"));
dotenv_1.default.config();
const authorisation_1 = require("./Server/Auth/authorisation");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/auth", routes_5.default);
app.use(authorisation_1.getUserDataMiddleWare);
app.use("/goal", routes_1.default);
app.use("/budget", routes_2.default);
app.use("/expense", routes_3.default);
app.use("/notes", routes_4.default);
app.use((error, req, res, next) => {
    res.status(500).json({
        error: error.message
    });
});
exports.default = app;
