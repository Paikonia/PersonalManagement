"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMonthlyGoalByIdQuery = exports.getAllMonthlyGoalsQuery = exports.deleteMonthlyGoalByIdQuery = exports.updateMonthlyGoal = exports.insertMonthlyGoalQueryBuilder = void 0;
const insertMonthlyGoalQueryBuilder = (monthlyGoalObjects, userId) => {
    try {
        const data = {
            success: [],
            failed: [],
        };
        monthlyGoalObjects.forEach((goal) => {
            if (parseMonthlyGoalInsertObject(goal)) {
                data.success.push(goal);
            }
            else {
                data.failed.push(goal);
            }
        });
        const placeholder = data.success.map(() => "(?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?)").join(", ");
        const parsedString = data.success
            .map((success) => insertMonthlyGoalQueryString(success, userId))
            .flat();
        const query = `INSERT INTO monthlyGoals(goal, urgency, importance, tasksInGoal, estimatePeriodPerDay, complete, goalPriority, goalCategory, monthStart, privacy, creator) \
    VALUES ${placeholder};`;
        return {
            query,
            failed: data.failed,
        };
    }
    catch (error) {
        throw error;
    }
};
exports.insertMonthlyGoalQueryBuilder = insertMonthlyGoalQueryBuilder;
const parseMonthlyGoalInsertObject = (goal) => {
    if (typeof goal.goal !== "string" ||
        goal.goal.trim() === "" ||
        typeof goal.urgency !== "number" ||
        typeof goal.importance !== "number" ||
        typeof goal.estimatePeriodPerDay !== "number" ||
        typeof goal.complete !== "boolean" ||
        typeof goal.goalPriority !== "number" ||
        ![
            "personal",
            "fitness",
            "family",
            "job",
            "project",
            "health",
            "other",
        ].includes(goal.goalCategory) ||
        typeof goal.monthStart !== "object" ||
        !(goal.monthStart instanceof Date) ||
        isNaN(goal.monthStart.getTime()) ||
        !["private", "public"].includes(goal.privacy)) {
        return false;
    }
    return true;
};
const insertMonthlyGoalQueryString = (goal, userId) => {
    return [goal.goal, goal.urgency, goal.importance, JSON.stringify(goal.tasksInGoal || '[]'), goal.estimatePeriodPerDay, goal.complete ? 1 : 0, goal.goalPriority, goal.goalCategory, goal.username, goal.monthStart.toISOString(), goal.privacy, userId];
};
const updateMonthlyGoal = (mGoalId, updatedGoal, userId) => {
    try {
        const parsed = parseMonthlyGoalUpdateObject(updatedGoal);
        if (Object.keys(parsed).length === 0) {
            return null;
        }
        return `UPDATE monthlyGoals SET ${parsed} WHERE mGoalId = "${mGoalId}" and creator = '${userId}';`;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
};
exports.updateMonthlyGoal = updateMonthlyGoal;
const parseMonthlyGoalUpdateObject = (goal) => {
    const updateFields = [];
    if (typeof goal.goal === "string") {
        updateFields.push(`goal = "${goal.goal}"`);
    }
    if (typeof goal.urgency === "number") {
        updateFields.push(`urgency = ${goal.urgency}`);
    }
    if (typeof goal.importance === "number") {
        updateFields.push(`importance = ${goal.importance}`);
    }
    if (typeof goal.estimatePeriodPerDay === "number") {
        updateFields.push(`estimatePeriodPerDay = ${goal.estimatePeriodPerDay}`);
    }
    if (typeof goal.complete === "boolean") {
        updateFields.push(`complete = ${goal.complete ? 1 : 0}`);
    }
    if (typeof goal.goalPriority === "number") {
        updateFields.push(`goalPriority = ${goal.goalPriority}`);
    }
    if (typeof goal.goalCategory === "string" &&
        [
            "personal",
            "fitness",
            "family",
            "job",
            "project",
            "health",
            "other",
        ].includes(goal.goalCategory)) {
        updateFields.push(`goalCategory = "${goal.goalCategory}"`);
    }
    if (typeof goal.username === "string") {
        updateFields.push(`username = "${goal.username}"`);
    }
    if (goal.monthStart instanceof Date) {
        updateFields.push(`monthStart = '${goal.monthStart.toISOString()}'`);
    }
    if (typeof goal.privacy === "string") {
        updateFields.push(`privacy = "${goal.privacy}"`);
    }
    return updateFields.join(", ");
};
const deleteMonthlyGoalByIdQuery = (mGoalId, userId) => {
    try {
        return `DELETE FROM monthlyGoals WHERE mGoalId = "${mGoalId}" and creator = '${userId}';`;
    }
    catch (error) {
        throw error;
    }
};
exports.deleteMonthlyGoalByIdQuery = deleteMonthlyGoalByIdQuery;
const getAllMonthlyGoalsQuery = (userId) => {
    try {
        return `SELECT * FROM monthlyGoals where creator = '${userId}';`;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
};
exports.getAllMonthlyGoalsQuery = getAllMonthlyGoalsQuery;
const getMonthlyGoalByIdQuery = (mGoalId, userId) => {
    try {
        return `SELECT * FROM monthlyGoals WHERE mGoalId = "${mGoalId}" and creator = '${userId}';`;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
};
exports.getMonthlyGoalByIdQuery = getMonthlyGoalByIdQuery;
