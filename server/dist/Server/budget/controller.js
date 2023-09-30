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
exports.deleteBudgetItemController = exports.updateBudgetItemController = exports.postBudgetItemController = exports.getBudgetItemByIdController = exports.getBudgetItemController = void 0;
const handler_1 = require("./handler");
const getBudgetItemController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = JSON.parse(req.headers.user);
        const returnedData = yield (0, handler_1.getAllBudgetHandler)(user.userId);
        res.json(returnedData);
    }
    catch (error) {
        next(error);
    }
});
exports.getBudgetItemController = getBudgetItemController;
const getBudgetItemByIdController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = JSON.parse(req.headers.user);
        const budgetId = req.params["id"];
        const ret = yield (0, handler_1.getBudgetByIdHandler)(budgetId, user.userId);
        res.json(ret);
    }
    catch (error) {
        next(error);
    }
});
exports.getBudgetItemByIdController = getBudgetItemByIdController;
const postBudgetItemController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.body.user;
        const data = req.body.data;
        const result = yield (0, handler_1.postBudgetItemsHandler)(data, user.userId);
        res.json({ success: true, data: result });
    }
    catch (error) {
        next(error);
    }
});
exports.postBudgetItemController = postBudgetItemController;
const updateBudgetItemController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body.data;
        const user = req.body.user;
        if (!data || !(data instanceof Object) || (Array.isArray(data))) {
            throw new Error('The request request an object that has the budget ids as keys and and changes in the object');
        }
        const result = yield (0, handler_1.updateBudgetHandler)(data, user.userId);
        res.json(result);
    }
    catch (error) {
        next(error);
    }
});
exports.updateBudgetItemController = updateBudgetItemController;
const deleteBudgetItemController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { budgetIds } = req.body.data;
        const { userId } = req.body.user;
        if (!Array.isArray(budgetIds)) {
            throw new Error("The data provided is not an array");
        }
        const data = yield (0, handler_1.deleteBudgetById)(budgetIds, userId);
        res.json({ data });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteBudgetItemController = deleteBudgetItemController;
