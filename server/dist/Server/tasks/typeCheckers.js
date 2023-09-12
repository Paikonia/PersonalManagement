"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyMonthlyTasksBreakdown = exports.verifyWeeklyTaskBreakdown = exports.verifyWeeklyGoal = exports.verifyTasks = exports.verifyMonthlyGoalsType = exports.verifyBodyForPostMonthly = void 0;
const CONSTANT = {
    goalCategory: ["personal", "fitness", "family", "job", "project", "health", "other"],
    privacy: ["public", "private", "personal"],
    progress: ["In progress", "Completed", "not started"]
};
const verifyMonthlyTasksBreakdown = (input) => {
    if ("taskName" in input &&
        typeof input.taskName === "string" &&
        input.taskName !== "" &&
        "taskDescription" in input &&
        typeof input.taskDescription === "string" &&
        input.taskDescription !== "" &&
        "taskOrder" in input &&
        typeof input.taskOrder === "number" &&
        "taskDuration" in input &&
        typeof input.taskDuration === "number") {
        return input;
    }
    return null;
};
exports.verifyMonthlyTasksBreakdown = verifyMonthlyTasksBreakdown;
const verifyWeeklyTaskBreakdown = (input) => {
    if (verifyMonthlyTasksBreakdown(input) &&
        "dayOfWeek" in input &&
        typeof input.dayOfWeek === "string") {
        return input;
    }
    return null;
};
exports.verifyWeeklyTaskBreakdown = verifyWeeklyTaskBreakdown;
const verifyMonthlyGoalsType = (input) => {
    if ("goal" in input &&
        typeof input.goal === "string" &&
        input.goal !== "" &&
        "urgency" in input &&
        typeof input.urgency === "number" &&
        input.urgency >= 0 &&
        input.urgency <= 10 &&
        "importance" in input &&
        typeof input.importance === "number" &&
        input.importance >= 0 &&
        input.importance <= 10 &&
        "estimatedDuration" in input &&
        typeof input.estimatedDuration === "string" &&
        "tasksInGoal" in input &&
        Array.isArray(input.tasksInGoal) &&
        "estimatePeriodPerDay" in input &&
        typeof input.estimatePeriodPerDay === "number" &&
        "complete" in input &&
        typeof input.complete === "boolean" &&
        "goalCategory" in input &&
        typeof input.goalCategory === "string" &&
        CONSTANT.goalCategory.includes(input.goalCategory) &&
        "username" in input &&
        typeof input.username === "string" &&
        input.username !== "" &&
        "privacy" in input &&
        CONSTANT.privacy.includes(input.privacy)) {
        return Object.assign(Object.assign({}, input), { tasksInGoal: (input.tasksInGoal.length > 0 ? input.tasksInGoal : '[]'), goalPriority: input.urgency + input.importance });
    }
    return null;
};
exports.verifyMonthlyGoalsType = verifyMonthlyGoalsType;
const verifyBodyForPostMonthly = (body) => {
    const success = [];
    const failed = [];
    body.forEach((element) => {
        const data = verifyMonthlyGoalsType(element);
        if (data) {
            success.push(data);
        }
        else {
            failed.push(element);
        }
    });
    return { success, failed };
};
exports.verifyBodyForPostMonthly = verifyBodyForPostMonthly;
const verifyWeeklyGoal = (input) => {
    if ("goal" in input &&
        typeof input.goal === "string" &&
        input.goal !== "" &&
        "urgency" in input &&
        typeof input.urgency === "number" &&
        "importance" in input &&
        typeof input.importance === "number" &&
        "weekStart" in input &&
        input.weekStart instanceof Date &&
        "weekEnd" in input &&
        input.weekEnd instanceof Date &&
        "completed" in input &&
        typeof input.completed === "boolean" &&
        "monthlyGoalId" in input &&
        typeof input.monthlyGoalId === "string" &&
        input.monthlyGoalId !== "" &&
        "goalPriority" in input &&
        typeof input.goalPriority === "number" &&
        "tasks" in input &&
        Array.isArray(input.tasks) &&
        input.tasks.every((task) => verifyWeeklyTaskBreakdown(task))) {
        return input;
    }
    return null;
};
exports.verifyWeeklyGoal = verifyWeeklyGoal;
const verifyTasks = (input) => {
    if ("tasksId" in input &&
        typeof input.tasksId === "number" &&
        "task" in input &&
        typeof input.task === "string" &&
        input.task !== "" &&
        "taskDate" in input &&
        input.taskDate instanceof Date &&
        "startingTime" in input &&
        typeof input.startingTime === "string" &&
        input.startingTime !== "" &&
        "complete" in input &&
        typeof input.complete === "boolean" &&
        "estimatedDuration" in input &&
        typeof input.estimatedDuration === "number" &&
        "goalId" in input &&
        typeof input.goalId === "string" &&
        input.goalId !== "" &&
        "progress" in input &&
        (input.progress === "In progress" ||
            input.progress === "Completed" ||
            input.progress === "not started")) {
        return input;
    }
    return null;
};
exports.verifyTasks = verifyTasks;
