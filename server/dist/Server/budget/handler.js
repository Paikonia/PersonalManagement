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
exports.updateBudgetHandler = exports.deleteBudgetById = exports.postBudgetItemsHandler = exports.getBudgetByIdHandler = exports.getAllBudgetHandler = void 0;
const database_1 = require("../database");
const budgetDatabaseCalls_1 = require("../database/QueryBuilders/budgetDatabaseCalls");
const getAllBudgetHandler = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { query, params } = (0, budgetDatabaseCalls_1.getAllBudgetsQuery)(userId);
        const data = yield (0, database_1.makeQueriesWithParams)(query, params);
        return data;
    }
    catch (error) {
        throw error;
    }
});
exports.getAllBudgetHandler = getAllBudgetHandler;
const getBudgetByIdHandler = (budgetId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { query, params } = (0, budgetDatabaseCalls_1.getBudgetByIdQuery)(budgetId, userId);
        const data = yield (0, database_1.makeQueriesWithParams)(query, params);
        const returned = data;
        return returned[0];
    }
    catch (error) {
        throw error;
    }
});
exports.getBudgetByIdHandler = getBudgetByIdHandler;
const postBudgetItemsHandler = (data, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { query, failed, params } = (0, budgetDatabaseCalls_1.insertBudgetQueryBuilder)(data, userId);
        if (query !== '')
            yield (0, database_1.makeQueriesWithParams)(query, params.flat());
        return {
            success: failed.length > 0 && query !== ""
                ? "Partially successful"
                : query === "" && failed.length > 0
                    ? "Failed parse data"
                    : "Success",
            failed,
        };
    }
    catch (error) {
        throw error;
    }
});
exports.postBudgetItemsHandler = postBudgetItemsHandler;
const deleteBudgetById = (ids, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const queries = (0, budgetDatabaseCalls_1.deleteBudgetByIdsQuery)(ids, userId);
        const result = yield (0, database_1.makeQueriesWithParams)(queries.data, queries.params).catch(err => { console.log(err); });
        (0, database_1.makeQueriesWithParams)(queries.delete, queries.params).catch(err => console.log(err));
        return result;
    }
    catch (error) {
        throw error;
    }
});
exports.deleteBudgetById = deleteBudgetById;
const updateBudgetHandler = (update, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const failed = [];
        const keys = Object.keys(update);
        const queries = keys.map((key) => {
            const query = (0, budgetDatabaseCalls_1.updateBudget)(key, update[key], userId);
            if (!query) {
                failed.push(update[key]);
                return "";
            }
            return query;
        });
        queries.forEach((query) => {
            (0, database_1.makeQueriesWithParams)(query.query, query.params).catch(error => {
                //TODO: Implement notification error for this.
                console.log(error);
            });
        });
        return {
            success: "Partial",
            message: "A notification will be send incase any of the update entries fail.",
            failed
        };
    }
    catch (error) { }
    return {
        success: 'Failed',
        failed: [],
        message: 'This will never be called.'
    };
});
exports.updateBudgetHandler = updateBudgetHandler;
