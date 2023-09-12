const makeDatabaseCall = require("../database/mysqlIndex");


const insertTask = async (taskObject, userId) => {
  try {
    const parsed = parseTaskInsertObject(taskObject, userId);
    if (Object.keys(parsed).length === 0) {
      return null;
    }

    await makeDatabaseCall(parsed);

    return parsed;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const parseTaskInsertObject = (task, userId) => {
  if (
    "task" in task &&
    typeof task.task === "string" &&
    "taskDate" in task &&
    typeof task.taskDate === "string" &&
    "startingTime" in task &&
    typeof task.startingTime === "string" &&
    "complete" in task &&
    typeof task.complete === "boolean" &&
    "estimatedDuration" in task &&
    typeof task.estimatedDuration === "number" &&
    "goalId" in task &&
    "progress" in task &&
    ["In progress", "Completed", "Not Started"].includes(task.progress) &&
    "privacy" in task &&
    (task.privacy === "public" || task.privacy === "private")
  ) {
    return `INSERT INTO tasks(task, taskDate, startingTime, complete, estimatedDuration, goalId, progress, privacy, creator) \
    VALUES('${task.task}', '${task.taskDate}', '${task.startingTime}', ${task.complete}, ${task.estimatedDuration}, \
    '${task.goalId}', '${task.progress}', '${task.privacy}', '${userId}');`;
  }
  return {};
};


const updateTask = async (tasksId, updatedTask) => {
  try {
    const parsed = parseTaskUpdateObject(updatedTask);
    if (Object.keys(parsed).length === 0) {
      return null;
    }

    await makeDatabaseCall(
      `UPDATE tasks SET ${parsed} WHERE tasksId = ${tasksId};`
    );

    return parsed;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const parseTaskUpdateObject = (task) => {
  const updateFields = [];
  if ("task" in task && typeof task.task === "string") {
    updateFields.push(`task = '${task.task}'`);
  }
  if ("taskDate" in task && typeof task.taskDate === "string") {
    updateFields.push(`taskDate = '${task.taskDate}'`);
  }
  if ("startingTime" in task && typeof task.startingTime === "string") {
    updateFields.push(`startingTime = '${task.startingTime}'`);
  }
  if ("complete" in task && typeof task.complete === "boolean") {
    updateFields.push(`complete = ${task.complete}`);
  }
  if (
    "estimatedDuration" in task &&
    typeof task.estimatedDuration === "number"
  ) {
    updateFields.push(`estimatedDuration = ${task.estimatedDuration}`);
  }
  if ("goalId" in task) {
    updateFields.push(`goalId = '${task.goalId}'`);
  }
  if (
    "progress" in task &&
    ["In progress", "Completed", "Not Started"].includes(task.progress)
  ) {
    updateFields.push(`progress = '${task.progress}'`);
  }
  if (
    "privacy" in task &&
    (task.privacy === "public" || task.privacy === "private")
  ) {
    updateFields.push(`privacy = '${task.privacy}'`);
  }

  return updateFields.join(", ");
};


const deleteTaskById = async (tasksId) => {
  try {
    await makeDatabaseCall(`DELETE FROM tasks WHERE tasksId = ${tasksId};`);
  } catch (error) {
    console.error(error);
    throw error;
  }
};


const getAllTasks = async () => {
  try {
    const tasks = await makeDatabaseCall("SELECT * FROM tasks;");
    return tasks;
  } catch (error) {
    console.error(error);
    throw error;
  }
};


const getTaskById = async (tasksId) => {
  try {
    const task = await makeDatabaseCall(
      `SELECT * FROM tasks WHERE tasksId = ${tasksId};`
    );
    return task;
  } catch (error) {
    console.error(error);
    throw error;
  }
};



module.exports = {insertTask, updateTask, deleteTaskById, getTaskById, getAllTasks}