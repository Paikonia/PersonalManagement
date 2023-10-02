"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWeeklyGoalByIdQuery = exports.getAllWeeklyGoalsQuery = exports.deleteWeeklyGoalByIdQuery = exports.updateWeeklyGoal = exports.insertWeeklyGoalQueryBuilder = void 0;
const insertWeeklyGoalQueryBuilder = (weeklyGoalObjects, userId) => {
    try {
        const data = {
            success: [],
            failed: [],
        };
        weeklyGoalObjects.forEach((goal) => {
            if (parseWeeklyGoalInsertObject(goal)) {
                data.success.push(goal);
            }
            else {
                data.failed.push(goal);
            }
        });
        const condition = data.success
            .map(() => "(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)")
            .join(", ");
        const params = data.success
            .map((success) => insertWeeklyGoalQueryString(success, userId))
            .flat();
        const query = `INSERT INTO weeklyGoals(goal, urgency, importance, weekStart, weekEnd, completed, monthlyGoalId, tasks, privacy, creator) \
    VALUES ${condition};`;
        return {
            query: params.length > 0 ? query : "",
            failed: data.failed,
            params,
        };
    }
    catch (error) {
        throw error;
    }
};
exports.insertWeeklyGoalQueryBuilder = insertWeeklyGoalQueryBuilder;
const parseWeeklyGoalInsertObject = (goal) => {
    if (typeof goal.goal === "string" &&
        goal.goal.trim() !== "" &&
        (typeof goal.urgency === "number" || typeof goal.urgency === "string") &&
        (typeof goal.importance === "number" ||
            typeof goal.importance === "string") &&
        typeof goal.weekStart === "string" &&
        goal.weekStart.trim() !== "" &&
        typeof goal.weekEnd === "string" &&
        goal.weekEnd.trim() !== "" &&
        typeof goal.completed === "boolean" &&
        typeof goal.monthlyGoalId === "string" &&
        goal.monthlyGoalId.trim() !== "" &&
        ["private", "public"].includes(goal.privacy)) {
        return true;
    }
    return false;
};
const insertWeeklyGoalQueryString = (goal, userId) => {
    return [
        goal.goal,
        goal.urgency,
        goal.importance,
        new Date(goal.weekStart).toISOString().split("T")[0],
        new Date(goal.weekEnd).toISOString().split("T")[0],
        goal.completed,
        goal.monthlyGoalId,
        JSON.stringify(goal.tasks || []),
        goal.privacy,
        userId,
    ];
};
const updateWeeklyGoal = (wGoalId, updatedGoal, userId) => {
    try {
        const parsed = parseWeeklyGoalUpdateObject(updatedGoal);
        if (Object.keys(parsed).length === 0) {
            return null;
        }
        return {
            query: `UPDATE weeklyGoals SET ${parsed.placeholder} WHERE wGoalId = ? and creator = ?;`,
            params: [...parsed.updateFields, wGoalId, userId],
        };
    }
    catch (error) {
        throw error;
    }
};
exports.updateWeeklyGoal = updateWeeklyGoal;
const parseWeeklyGoalUpdateObject = (goal) => {
    const updateFields = [];
    const placeholder = [];
    if (typeof goal.goal === "string") {
        updateFields.push(goal.goal);
        placeholder.push("goal = ?");
    }
    if (typeof goal.urgency === "number" || typeof goal.urgency === "string") {
        updateFields.push(Number(goal.urgency));
        placeholder.push("urgency = ?");
    }
    if (typeof goal.importance === "number" ||
        typeof goal.importance === "string") {
        updateFields.push(Number(goal.importance));
        placeholder.push("importance = ?");
    }
    if (typeof goal.weekStart === "string") {
        const weekStart = new Date(goal.weekStart).toISOString().split("T")[0];
        updateFields.push(weekStart);
        placeholder.push("weekStart = ?");
    }
    if (typeof goal.weekEnd === "string") {
        const weekEnd = new Date(goal.weekEnd).toISOString().split("T")[0];
        updateFields.push(weekEnd);
        placeholder.push("weekEnd = ?");
    }
    if (typeof goal.completed === "boolean") {
        updateFields.push(goal.completed);
        placeholder.push("completed = ?");
    }
    if (typeof goal.monthlyGoalId === "string") {
        updateFields.push(goal.monthlyGoalId);
        placeholder.push("monthlyGoalId = ?");
    }
    if (typeof goal.tasks !== "undefined") {
        const tasks = JSON.stringify(goal.tasks);
        updateFields.push(tasks);
        placeholder.push("tasks = ?");
    }
    if (typeof goal.privacy === "string") {
        updateFields.push(goal.privacy);
        placeholder.push("privacy = ?");
    }
    return { updateFields, placeholder: placeholder.join(", ") };
};
const deleteWeeklyGoalByIdQuery = (wGoalId, userId) => {
    try {
        const condition = wGoalId.map((id) => "?").join(", ");
        return {
            delete: `DELETE FROM weeklyGoals WHERE wGoalId in (${condition}) and creator = ?;`,
            data: `select * FROM weeklyGoals WHERE wGoalId in (${condition}) and creator = ?;`,
            params: [...wGoalId, userId],
        };
    }
    catch (error) {
        throw error;
    }
};
exports.deleteWeeklyGoalByIdQuery = deleteWeeklyGoalByIdQuery;
const getAllWeeklyGoalsQuery = (userId) => {
    try {
        return {
            query: `SELECT * FROM weeklyGoals where creator = ?;`,
            params: [userId],
        };
    }
    catch (error) {
        console.error(error);
        throw error;
    }
};
exports.getAllWeeklyGoalsQuery = getAllWeeklyGoalsQuery;
const getWeeklyGoalByIdQuery = (wGoalId, userId) => {
    try {
        return {
            query: `SELECT * FROM weeklyGoals WHERE wGoalId = ? and creator = ?;`,
            params: [wGoalId, userId],
        };
    }
    catch (error) {
        console.error(error);
        throw error;
    }
};
exports.getWeeklyGoalByIdQuery = getWeeklyGoalByIdQuery;
