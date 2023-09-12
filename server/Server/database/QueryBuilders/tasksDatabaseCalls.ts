import { generateRandomAlphanumeric } from "../../utilities/generators";

interface TaskType {
  taskId: number;
  task: string;
  taskDate: Date;
  startingTime: Date;
  complete: boolean;
  estimatedDuration: number;
  goalId: string;
  progress: "In progress" | "Completed" | "Not Started";
  privacy: "private" | "public";
  creator: string;
}

export const insertTaskQueryBuilder = (
  taskObjects: TaskType[],
  userId: string
): { query: string, failed: TaskType[] } => {
  try {
    const data: {
      success: TaskType[],
      failed: TaskType[],
    } = {
      success: [],
      failed: [],
    };

    taskObjects.forEach((task) => {
      if (parseTaskInsertObject(task)) {
        data.success.push(task);
      } else {
        data.failed.push(task);
      }
    });

    const parsedString = data.success
      .map((success) => insertTaskQueryString(success, userId))
      .join();
    const query = `INSERT INTO tasks(task, taskDate, startingTime, complete, estimatedDuration, goalId, progress, privacy, creator) \
    VALUES ${parsedString};`;
    return {
      query,
      failed: data.failed,
    };
  } catch (error) {
    throw error;
  }
};

const parseTaskInsertObject = (task: TaskType): boolean => {
  if (
    typeof task.task !== "string" ||
    task.task.trim() === "" || // Check if task name is not empty
    !(task.taskDate instanceof Date) ||
    isNaN(task.taskDate.getTime()) || // Check if taskDate is a valid Date
    !(task.startingTime instanceof Date) ||
    isNaN(task.startingTime.getTime()) || // Check if startingTime is a valid Date
    typeof task.complete !== "boolean" ||
    typeof task.estimatedDuration !== "number" ||
    isNaN(task.estimatedDuration) ||
    typeof task.goalId !== "string" ||
    task.goalId.trim() === "" || // Check if goalId is not empty
    !["In progress", "Completed", "Not Started"].includes(task.progress) || // Check if progress is one of the valid values
    !["private", "public"].includes(task.privacy) // Check if privacy is one of the valid values
  ) {
    return false;
  }
  return true;
};


const insertTaskQueryString = (task: TaskType, userId: string) => {
  const taskId = generateRandomAlphanumeric(5);
  return `("${taskId}", "${
    task.task
  }", "${task.taskDate.toISOString()}", "${task.startingTime.toISOString()}", ${
    task.complete ? 1 : 0
  }, ${task.estimatedDuration}, "${task.goalId}", "${task.progress}", "${
    task.privacy
  }", "${userId}")`;
};

export const updateTask = (
  taskId: number,
  updatedTask: Partial<TaskType>,
  userId: string
): string | null => {
  try {
    const parsed = parseTaskUpdateObject(updatedTask);
    if (Object.keys(parsed).length === 0) {
      return null;
    }

    return `UPDATE tasks SET ${parsed} WHERE taskId = ${taskId} and creator = '${userId}';`;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const parseTaskUpdateObject = (task: Partial<TaskType>) => {
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

export const deleteTaskByIdQuery = (taskId: number, userId: string): string => {
  try {
    return `DELETE FROM tasks WHERE taskId = ${taskId} and creator = '${userId}';`;
  } catch (error) {
    throw error;
  }
};

export const getAllTasksQuery = (userId: string): string => {
  try {
    return `SELECT * FROM tasks where creator = '${userId}';`;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getTaskByIdQuery = (taskId: number, userId: string): string => {
  try {
    return `SELECT * FROM tasks WHERE taskId = ${taskId} and creator = '${userId}';`;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
