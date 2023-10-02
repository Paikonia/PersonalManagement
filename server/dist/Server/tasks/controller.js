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
exports.deleteTaskItemController = exports.updateTaskItemController = exports.postTaskItemController = exports.getTaskItemController = exports.deleteMonthlyGoalItemController = exports.updateMonthlyGoalItemController = exports.postMonthlyGoalItemController = exports.getMonthlyGoalItemByIdController = exports.getMonthlyGoalItemController = exports.deleteWeeklyGoalItemController = exports.updateWeeklyGoalItemController = exports.postWeeklyGoalItemController = exports.getWeeklyGoalItemController = void 0;
const handler_1 = require("./handler");
const getWeeklyGoalItemController = (req, res, next) => {
    try {
        res.send("Get Weekly Goal Item");
    }
    catch (error) {
        next(error);
    }
};
exports.getWeeklyGoalItemController = getWeeklyGoalItemController;
const postWeeklyGoalItemController = (req, res, next) => {
    try {
        res.send("Post Weekly Goal Item");
    }
    catch (error) {
        next(error);
    }
};
exports.postWeeklyGoalItemController = postWeeklyGoalItemController;
const updateWeeklyGoalItemController = (req, res, next) => {
    try {
        res.send("update Weekly Goal Item");
    }
    catch (error) {
        next(error);
    }
};
exports.updateWeeklyGoalItemController = updateWeeklyGoalItemController;
const deleteWeeklyGoalItemController = (req, res, next) => {
    try {
        res.send("Delete Weekly Goal Item");
    }
    catch (error) {
        next(error);
    }
};
exports.deleteWeeklyGoalItemController = deleteWeeklyGoalItemController;
const getMonthlyGoalItemController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = JSON.parse(req.headers.user);
        const goals = yield (0, handler_1.getAllMonthlyGoalsHandler)(user.userId);
        res.json(goals);
    }
    catch (error) {
        next(error);
    }
});
exports.getMonthlyGoalItemController = getMonthlyGoalItemController;
const getMonthlyGoalItemByIdController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = JSON.parse(req.headers.user);
        console.log(user);
        const budgetId = req.params["mGoalId"];
        const result = yield (0, handler_1.getMonthlyGoalByIdHandler)(budgetId, user.userId);
        res.json(result);
    }
    catch (error) {
        next(error);
    }
});
exports.getMonthlyGoalItemByIdController = getMonthlyGoalItemByIdController;
const postMonthlyGoalItemController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body.data;
        const userId = req.body.user.userId;
        const query = yield (0, handler_1.postMonthlyGoalItemHanlder)(body, userId);
        res.json(query);
    }
    catch (error) {
        next(error);
    }
});
exports.postMonthlyGoalItemController = postMonthlyGoalItemController;
const updateMonthlyGoalItemController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body.data;
        const user = req.body.user;
        const result = yield (0, handler_1.updateMonthlyGoalsHandler)(data, user.userId);
        res.json(result);
    }
    catch (error) {
        next(error);
    }
});
exports.updateMonthlyGoalItemController = updateMonthlyGoalItemController;
const deleteMonthlyGoalItemController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body.data;
        const user = req.body.user;
        const result = yield (0, handler_1.deleteMonthlyGoalsById)(data, user.userId);
        res.json(result);
    }
    catch (error) {
        next(error);
    }
});
exports.deleteMonthlyGoalItemController = deleteMonthlyGoalItemController;
const getTaskItemController = (req, res, next) => {
    try {
        res.send("Get task Item");
    }
    catch (error) {
        next(error);
    }
};
exports.getTaskItemController = getTaskItemController;
const postTaskItemController = (req, res, next) => {
    try {
        res.send("Post task Item");
    }
    catch (error) {
        next(error);
    }
};
exports.postTaskItemController = postTaskItemController;
const updateTaskItemController = (req, res, next) => {
    try {
        res.send("update task Item");
    }
    catch (error) {
        next(error);
    }
};
exports.updateTaskItemController = updateTaskItemController;
const deleteTaskItemController = (req, res, next) => {
    try {
        res.send("Delete task Item");
    }
    catch (error) {
        next(error);
    }
};
exports.deleteTaskItemController = deleteTaskItemController;
