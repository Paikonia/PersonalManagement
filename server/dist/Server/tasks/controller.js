"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTaskItemController = exports.updateTaskItemController = exports.postTaskItemController = exports.getTaskItemController = exports.deleteMonthlyGoalItemController = exports.updateMonthlyGoalItemController = exports.postMonthlyGoalItemController = exports.getMonthlyGoalItemController = exports.deleteWeeklyGoalItemController = exports.updateWeeklyGoalItemController = exports.postWeeklyGoalItemController = exports.getWeeklyGoalItemController = void 0;
const handler_1 = require("./handler");
const typeCheckers_1 = require("./typeCheckers");
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
const getMonthlyGoalItemController = (req, res, next) => {
    try {
        res.send("Get Monthly Goal Item");
    }
    catch (error) {
        next(error);
    }
};
exports.getMonthlyGoalItemController = getMonthlyGoalItemController;
const postMonthlyGoalItemController = (req, res, next) => {
    try {
        const body = req.body.data;
        const data = (0, typeCheckers_1.verifyBodyForPostMonthly)(body);
        if (data.success.length > 0) {
            const query = (0, handler_1.postMonthlyGoalItemHanlder)(data.success);
            console.log(query);
            //res.send({ query });
        }
        res.json(data);
        const returnedData = { success: 'Partial', erroredInputs: data.failed, };
    }
    catch (error) {
        next(error);
    }
};
exports.postMonthlyGoalItemController = postMonthlyGoalItemController;
const updateMonthlyGoalItemController = (req, res, next) => {
    try {
        res.send("update Monthly Goal Item");
    }
    catch (error) {
        next(error);
    }
};
exports.updateMonthlyGoalItemController = updateMonthlyGoalItemController;
const deleteMonthlyGoalItemController = (req, res, next) => {
    try {
        res.send("Delete Monthly Goal Item");
    }
    catch (error) {
        next(error);
    }
};
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
