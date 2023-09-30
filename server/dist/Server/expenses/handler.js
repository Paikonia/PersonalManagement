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
exports.deleteExpenseHandler = exports.updateExpenseHandler = exports.createExpenseHandler = exports.getExpenseByIdHandler = exports.getAllExpensesHandler = void 0;
const database_1 = require("../database");
const expensesDatabaseCall_1 = require("../database/QueryBuilders/expensesDatabaseCall");
const getAllExpensesHandler = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = (0, expensesDatabaseCall_1.getAllExpensesQuery)(userId);
        return yield (0, database_1.makeQueriesWithParams)(query.query, query.params);
    }
    catch (error) {
        throw error;
    }
});
exports.getAllExpensesHandler = getAllExpensesHandler;
const getExpenseByIdHandler = (expenseId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = (0, expensesDatabaseCall_1.getExpenseByIdQuery)(expenseId, userId);
        const data = yield (0, database_1.makeQueriesWithParams)(query.query, query.params);
        return data[0];
    }
    catch (error) {
        throw error;
    }
});
exports.getExpenseByIdHandler = getExpenseByIdHandler;
const createExpenseHandler = (expenses, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { query, failed, params } = (0, expensesDatabaseCall_1.insertExpenseQueryBuilder)(expenses, userId);
        yield (0, database_1.makeQueriesWithParams)(query, params.flat());
        return {
            failed: failed,
            success: failed.length > 0 && query !== ""
                ? "Partial"
                : query === ""
                    ? "Failed"
                    : "Success",
        };
    }
    catch (error) {
        throw error;
    }
});
exports.createExpenseHandler = createExpenseHandler;
const updateExpenseHandler = (updates, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const returnedData = {
            failed: [],
            message: "",
            success: "",
        };
        const expenseIds = Object.keys(updates);
        const updateQueries = expenseIds.map((expId) => {
            const query = (0, expensesDatabaseCall_1.updateExpense)(expId, updates[expId], userId);
            if (!query) {
                returnedData.failed.push(updates[expId]);
            }
            return query;
        });
        updateQueries.forEach((query) => {
            if (query)
                (0, database_1.makeQueriesWithParams)(query === null || query === void 0 ? void 0 : query.query, query === null || query === void 0 ? void 0 : query.params).catch((err) => {
                    //TODO: handle the foreign key failure error here. 
                });
        });
        return returnedData;
    }
    catch (error) {
        throw error;
    }
});
exports.updateExpenseHandler = updateExpenseHandler;
const deleteExpenseHandler = (expenseIds, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const queries = (0, expensesDatabaseCall_1.deleteExpenseByIdQuery)(expenseIds, userId);
        const result = yield (0, database_1.makeQueriesWithParams)(queries.data, queries.params).catch(err => { console.error(err); });
        (0, database_1.makeQueriesWithParams)(queries.delete, queries.params).catch(error => { console.log(error); });
        return result;
    }
    catch (error) {
        /**TODO: send notification on failure */
        throw error;
    }
});
exports.deleteExpenseHandler = deleteExpenseHandler;
