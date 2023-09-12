"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postMonthlyGoalItemHanlder = void 0;
const monthSqlBuider_1 = require("./database/monthSqlBuider");
const postMonthlyGoalItemHanlder = (body) => {
    const query = (0, monthSqlBuider_1.insertQueryBuilder)(body);
    return query;
};
exports.postMonthlyGoalItemHanlder = postMonthlyGoalItemHanlder;
