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
exports.deleteExpenseItemController = exports.updateExpenseItemController = exports.postExpenseItemController = exports.getExpenseItemByIdController = exports.getExpenseItemController = void 0;
const handler_1 = require("./handler");
const OtherErrorDefinitions_1 = require("../Constants/OtherErrorDefinitions");
const getExpenseItemController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userString = req.headers.user;
        if (!userString) {
            throw new Error("The request requires an authenticated user.");
        }
        const user = JSON.parse(userString);
        const expenses = yield (0, handler_1.getAllExpensesHandler)(user.userId);
        res.json(expenses);
    }
    catch (error) {
        next(error);
    }
});
exports.getExpenseItemController = getExpenseItemController;
const getExpenseItemByIdController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userString = req.headers.user;
        if (!userString) {
            throw new Error("The request requires an authenticated user.");
        }
        const user = JSON.parse(userString);
        const expenseId = req.params["expenseId"];
        if (!expenseId)
            throw new Error("Please provide an expense id");
        const expense = yield (0, handler_1.getExpenseByIdHandler)(expenseId, user.userId);
        res.json(expense);
    }
    catch (error) {
        next(error);
    }
});
exports.getExpenseItemByIdController = getExpenseItemByIdController;
const postExpenseItemController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user, data } = req.body;
        if (!data || !Array.isArray(data)) {
            const error = OtherErrorDefinitions_1.GENERALERRORS.MalformedRequest;
            error.message = 'The data you have passed must be an array of expenses';
            throw error;
        }
        const response = yield (0, handler_1.createExpenseHandler)(data, user.userId);
        res.json(response);
    }
    catch (error) {
        next(error);
    }
});
exports.postExpenseItemController = postExpenseItemController;
const updateExpenseItemController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { data, user } = req.body;
        if (!data || typeof data !== 'object' || (Array.isArray(data))) {
            const err = OtherErrorDefinitions_1.GENERALERRORS.MalformedRequest;
            err.message = 'The request requires a data object that contains expenseIds and the changes to be updated';
            throw err;
        }
        const returnedData = yield (0, handler_1.updateExpenseHandler)(data, user.userId);
        res.json(returnedData);
    }
    catch (error) {
        next(error);
    }
});
exports.updateExpenseItemController = updateExpenseItemController;
const deleteExpenseItemController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user, data } = req.body;
        const { expenseIds } = data;
        if (!expenseIds || !Array.isArray(expenseIds)) {
            const err = OtherErrorDefinitions_1.GENERALERRORS.MalformedRequest;
            err.message = 'Please provide and array of expense IDs to delete!';
            throw err;
        }
        const returnedData = yield (0, handler_1.deleteExpenseHandler)(expenseIds, user.userId);
        res.json(returnedData);
    }
    catch (error) {
        next(error);
    }
});
exports.deleteExpenseItemController = deleteExpenseItemController;
