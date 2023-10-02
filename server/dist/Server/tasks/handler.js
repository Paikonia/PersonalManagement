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
exports.deleteMonthlyGoalsById = exports.getMonthlyGoalByIdHandler = exports.getAllMonthlyGoalsHandler = exports.updateMonthlyGoalsHandler = exports.postMonthlyGoalItemHanlder = void 0;
const database_1 = require("../database");
const monthGoalDatabaseCalls_1 = require("../database/QueryBuilders/monthGoalDatabaseCalls");
const postMonthlyGoalItemHanlder = (body, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const { query, params, failed } = (0, monthGoalDatabaseCalls_1.insertMonthlyGoalQueryBuilder)(body, userId);
    if (query !== '')
        yield (0, database_1.makeQueriesWithParams)(query, params);
    return {
        success: failed.length > 0 && query !== ""
            ? "Partially successful"
            : query === "" && failed.length > 0
                ? "Failed parse data"
                : "Success",
        failed,
    };
});
exports.postMonthlyGoalItemHanlder = postMonthlyGoalItemHanlder;
const updateMonthlyGoalsHandler = (updates, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const failed = [];
        Object.keys(updates)
            .map((mGoalId) => {
            const query = (0, monthGoalDatabaseCalls_1.updateMonthlyGoal)(mGoalId, updates[mGoalId], userId);
            if (!query) {
                failed.push(updates[mGoalId]);
                return "";
            }
            return query;
        })
            .forEach((query) => {
            if (query && String(query) !== "")
                (0, database_1.makeQueriesWithParams)(query.query, query.params).catch((e) => {
                    //TODO: handle notification incase of failure
                });
        });
        return {
            success: "Partial",
            message: "A notification will be send incase any of the update entries fail.",
            failed,
        };
    }
    catch (error) { }
});
exports.updateMonthlyGoalsHandler = updateMonthlyGoalsHandler;
const getAllMonthlyGoalsHandler = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { query, params } = (0, monthGoalDatabaseCalls_1.getAllMonthlyGoalsQuery)(userId);
        return yield (0, database_1.makeQueriesWithParams)(query, params);
    }
    catch (error) {
        throw error;
    }
});
exports.getAllMonthlyGoalsHandler = getAllMonthlyGoalsHandler;
const getMonthlyGoalByIdHandler = (mGoalId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { query, params } = (0, monthGoalDatabaseCalls_1.getMonthlyGoalByIdQuery)(mGoalId, userId);
        return yield (0, database_1.makeQueriesWithParams)(query, params);
    }
    catch (error) {
        throw error;
    }
});
exports.getMonthlyGoalByIdHandler = getMonthlyGoalByIdHandler;
const deleteMonthlyGoalsById = (ids, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const queries = (0, monthGoalDatabaseCalls_1.deleteMonthlyGoalByIdQuery)(ids, userId);
        const result = yield (0, database_1.makeQueriesWithParams)(queries.data, queries.params);
        (0, database_1.makeQueriesWithParams)(queries.delete, queries.params).catch((err) => console.log(err));
        return result;
    }
    catch (error) {
        throw error;
    }
});
exports.deleteMonthlyGoalsById = deleteMonthlyGoalsById;
