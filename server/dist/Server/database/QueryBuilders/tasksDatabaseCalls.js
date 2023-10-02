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
            query: params.length > 0 ? query : "",
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
        task.task.trim() !== "" &&
        typeof task.startingTime === "string" &&
        String(task.startingTime).trim() !== "" &&
        (typeof task.estimatedDuration === "number" ||
            typeof task.estimatedDuration === "string") &&
        typeof task.goalId === "string" &&
        task.goalId.trim() !== "" &&
        ["In progress", "Completed", "Not Started"].includes(task.progress) &&
        ["private", "public"].includes(task.privacy)) {
        return true;
    }
    return false;
};
const insertTaskQueryString = (task, userId) => {
    const datetime = new Date(task.startingTime).toISOString();
    const res = `${datetime.split('T')[0]} ${(datetime.split('T')[1]).split('.')[0]}`;
    return [
        task.task,
        new Date(task.taskDate).toISOString().split("T")[0],
        res,
        task.estimatedDuration,
        task.goalId,
        task.progress,
        task.privacy,
        userId,
    ];
};
const updateTask = (taskId, updatedTask, userId) => {
    try {
        const parsed = parseTaskUpdateObject(updatedTask);
        if (Object.keys(parsed).length === 0) {
            return null;
        }
        return {
            query: `UPDATE tasks SET ${parsed.placeholder} WHERE taskId = ? and creator = ?;`,
            params: [...parsed.updateFields, Number(taskId), userId],
        };
    }
    catch (error) {
        console.error(error);
        throw error;
    }
};
exports.updateTask = updateTask;
const parseTaskUpdateObject = (task) => {
    const updateFields = [];
    const placeholder = [];
    if (typeof task.task === "string") {
        updateFields.push(task.task);
        placeholder.push("task = ?");
    }
    if (typeof task.taskDate === "string") {
        const taskDate = new Date(task.taskDate).toISOString().split("T")[0];
        updateFields.push(taskDate);
        placeholder.push("taskDate = ?");
    }
    if (typeof task.startingTime === "string") {
        const startingTime = new Date(task.startingTime).toISOString();
        const res = `${startingTime.split("T")[0]} ${startingTime.split("T")[1].split(".")[0]}`;
        updateFields.push(res);
        placeholder.push("startingTime = ?");
    }
    if (typeof task.estimatedDuration === "number" ||
        typeof task.estimatedDuration === "string") {
        updateFields.push(Number(task.estimatedDuration));
        placeholder.push("estimatedDuration = ?");
    }
    if (typeof task.goalId === "string") {
        updateFields.push(task.goalId);
        placeholder.push("goalId = ?");
    }
    if (typeof task.progress === "string") {
        updateFields.push(task.progress);
        placeholder.push("progress = ?");
    }
    if (typeof task.privacy === "string") {
        updateFields.push(task.privacy);
        placeholder.push("privacy = ?");
    }
    return {
        updateFields,
        placeholder: placeholder.join(", "),
    };
};
const deleteTaskByIdQuery = (taskId, userId) => {
    try {
        const tasks = [];
        const condition = [];
        taskId.forEach((id) => {
            tasks.push(Number(id));
            condition.push(`?`);
        });
        return {
            delete: `DELETE FROM tasks WHERE mGoalId in (${condition.join(", ")}) and creator = ?;`,
            data: `select * FROM tasks WHERE mGoalId in (${condition.join(", ")}) and creator = ?;`,
            params: [...tasks, userId],
        };
    }
    catch (error) {
        throw error;
    }
};
exports.deleteTaskByIdQuery = deleteTaskByIdQuery;
const getAllTasksQuery = (userId) => {
    try {
        return {
            query: `SELECT * FROM tasks where creator = ?;`,
            params: [userId],
        };
    }
    catch (error) {
        console.error(error);
        throw error;
    }
};
exports.getAllTasksQuery = getAllTasksQuery;
const getTaskByIdQuery = (taskId, userId) => {
    try {
        return {
            query: `SELECT * FROM tasks WHERE taskId = ? and creator = ?;`,
            params: [Number(taskId), userId],
        };
    }
    catch (error) {
        console.error(error);
        throw error;
    }
};
exports.getTaskByIdQuery = getTaskByIdQuery;
