"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTaskByIdQuery = exports.getAllTasksQuery = exports.deleteTaskByIdQuery = exports.updateTask = exports.insertTaskQueryBuilder = void 0;
const insertTaskQueryBuilder = (taskObjects, userId) => {
    try {
        const data = {
            success: [],
            failed: [],
        };
        taskObjects.forEach((task) => {
            if (parseTaskInsertObject(task)) {
                data.success.push(task);
            }
            else {
                data.failed.push(task);
            }
        });
        const placeholder = data.success
            .map(() => "(?, ?, ?, ?, ?, ?, ?, ?)")
            .join(", ");
        const params = data.success
            .map((success) => insertTaskQueryString(success, userId))
            .flat();
        const query = `INSERT INTO tasks(task, taskDate, startingTime, estimatedDuration, goalId, progress, privacy, creator) \
    VALUES ${placeholder};`;
        return {
            params,
            query,
            failed: data.failed,
        };
    }
    catch (error) {
        throw error;
    }
};
exports.insertTaskQueryBuilder = insertTaskQueryBuilder;
const parseTaskInsertObject = (task) => {
    if (typeof task.task === "string" &&
        task.task.trim() === "" &&
        typeof task.startingTime === "string" &&
        String(task.startingTime).trim() !== "" &&
        (typeof task.estimatedDuration === "number" ||
            typeof task.estimatedDuration === "string") &&
        typeof task.goalId === "string" &&
        task.goalId.trim() === "" &&
        ["In progress", "Completed", "Not Started"].includes(task.progress) &&
        ["private", "public"].includes(task.privacy)) {
        return true;
    }
    return false;
};
const insertTaskQueryString = (task, userId) => [
    task.task,
    task.taskDate.toISOString(),
    task.startingTime.toISOString(),
    task.estimatedDuration,
    task.goalId,
    task.progress,
    task.privacy,
    userId,
];
const updateTask = (taskId, updatedTask, userId) => {
    try {
        const parsed = parseTaskUpdateObject(updatedTask);
        if (Object.keys(parsed).length === 0) {
            return null;
        }
        return `UPDATE tasks SET ${parsed} WHERE taskId = ${taskId} and creator = '${userId}';`;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
};
exports.updateTask = updateTask;
const parseTaskUpdateObject = (task) => {
    const updateFields = [];
    if (typeof task.task === "string") {
        updateFields.push(`task = "${task.task}"`);
    }
    if (task.taskDate instanceof Date) {
        updateFields.push(`taskDate = '${task.taskDate.toISOString()}'`);
    }
    if (task.startingTime instanceof Date) {
        updateFields.push(`startingTime = '${task.startingTime.toISOString()}'`);
    }
    if (typeof task.complete === "boolean") {
        updateFields.push(`complete = ${task.complete ? 1 : 0}`);
    }
    if (typeof task.estimatedDuration === "number") {
        updateFields.push(`estimatedDuration = ${task.estimatedDuration}`);
    }
    if (typeof task.goalId === "string") {
        updateFields.push(`goalId = "${task.goalId}"`);
    }
    if (typeof task.progress === "string") {
        updateFields.push(`progress = "${task.progress}"`);
    }
    if (typeof task.privacy === "string") {
        updateFields.push(`privacy = "${task.privacy}"`);
    }
    return updateFields.join(", ");
};
const deleteTaskByIdQuery = (taskId, userId) => {
    try {
        return `DELETE FROM tasks WHERE taskId = ${taskId} and creator = '${userId}';`;
    }
    catch (error) {
        throw error;
    }
};
exports.deleteTaskByIdQuery = deleteTaskByIdQuery;
const getAllTasksQuery = (userId) => {
    try {
        return `SELECT * FROM tasks where creator = '${userId}';`;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
};
exports.getAllTasksQuery = getAllTasksQuery;
const getTaskByIdQuery = (taskId, userId) => {
    try {
        return `SELECT * FROM tasks WHERE taskId = ${taskId} and creator = '${userId}';`;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
};
exports.getTaskByIdQuery = getTaskByIdQuery;
