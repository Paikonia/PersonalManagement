"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertQueryBuilder = void 0;
const monthlyInsert = "goal,urgency,importance,tasks_in_goal,estimate_period_per_day,complete,goal_priority,goal_category,username,privacy,month_start";
const insertQueryBuilder = (input) => {
    const values = input
        .map((value) => {
        return builderInsertValues(value);
    })
        .join(", ");
    return `insert into monthly_goals (${monthlyInsert}) values ${values}`;
};
exports.insertQueryBuilder = insertQueryBuilder;
const builderInsertValues = (value) => {
    return `('${value.goal}', ${value.urgency}, ${value.importance}, '${value.tasksInGoal}', ${value.estimatePeriodPerDay},${value.complete}, ${value.goalPriority},'${value.goalCategory}','${value.username}', '${value.privacy}', '${value.monthStart}')`;
};
