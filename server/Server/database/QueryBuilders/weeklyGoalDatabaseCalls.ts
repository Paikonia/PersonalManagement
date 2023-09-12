import { generateRandomAlphanumeric } from "../../utilities/generators";

interface WeeklyGoalType {
  wGoalId: string;
  goal: string;
  urgency: number;
  importance: number;
  weekStart: Date;
  weekEnd: Date;
  completed: boolean;
  monthlyGoalId: string;
  goalPriority: number;
  tasks: any; // You can specify the appropriate type for tasks
  privacy: "private" | "public";
  creator: string;
}

export const insertWeeklyGoalQueryBuilder = (
  weeklyGoalObjects: WeeklyGoalType[],
  userId: string
): { query: string, failed: WeeklyGoalType[] } => {
  try {
    const data: {
      success: WeeklyGoalType[],
      failed: WeeklyGoalType[],
    } = {
      success: [],
      failed: [],
    };

    weeklyGoalObjects.forEach((goal) => {
      if (parseWeeklyGoalInsertObject(goal)) {
        data.success.push(goal);
      } else {
        data.failed.push(goal);
      }
    });

    const parsedString = data.success
      .map((success) => insertWeeklyGoalQueryString(success, userId))
      .join();
    const query = `INSERT INTO weeklyGoals(wGoalId, goal, urgency, importance, weekStart, weekEnd, completed, monthlyGoalId, goalPriority, tasks, privacy, creator) \
    VALUES ${parsedString};`;
    return {
      query,
      failed: data.failed,
    };
  } catch (error) {
    throw error;
  }
};

const parseWeeklyGoalInsertObject = (goal: WeeklyGoalType): boolean => {
  if (
    typeof goal.goal !== "string" ||
    goal.goal.trim() === "" || // Check if goal name is not empty
    typeof goal.urgency !== "number" ||
    typeof goal.importance !== "number" ||
    !(goal.weekStart instanceof Date) ||
    isNaN(goal.weekStart.getTime()) || // Check if weekStart is a valid Date
    !(goal.weekEnd instanceof Date) ||
    isNaN(goal.weekEnd.getTime()) || // Check if weekEnd is a valid Date
    typeof goal.completed !== "boolean" ||
    typeof goal.goalPriority !== "number" ||
    typeof goal.monthlyGoalId !== "string" ||
    goal.monthlyGoalId.trim() === "" || // Check if monthlyGoalId is not empty
    !["private", "public"].includes(goal.privacy) || // Check if privacy is one of the valid values
    typeof goal.creator !== "string"
  ) {
    return false;
  }
  return true;
};

const insertWeeklyGoalQueryString = (goal: WeeklyGoalType, userId: string) => {
  const wGoalId = generateRandomAlphanumeric(6);
  return `("${wGoalId}", "${goal.goal}", ${goal.urgency}, ${
    goal.importance
  }, "${goal.weekStart.toISOString()}", "${goal.weekEnd.toISOString()}", ${
    goal.completed ? 1 : 0
  }, "${goal.monthlyGoalId}", ${goal.goalPriority}, '${JSON.stringify(
    goal.tasks
  )}', "${goal.privacy}", "${userId}")`;
};

export const updateWeeklyGoal = (
  wGoalId: string,
  updatedGoal: Partial<WeeklyGoalType>,
  userId: string
): string | null => {
  try {
    const parsed = parseWeeklyGoalUpdateObject(updatedGoal);
    if (Object.keys(parsed).length === 0) {
      return null;
    }

    return `UPDATE weeklyGoals SET ${parsed} WHERE wGoalId = "${wGoalId}" and creator = '${userId}';`;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const parseWeeklyGoalUpdateObject = (goal: Partial<WeeklyGoalType>) => {
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
  if (goal.weekStart instanceof Date) {
    updateFields.push(`weekStart = '${goal.weekStart.toISOString()}'`);
  }
  if (goal.weekEnd instanceof Date) {
    updateFields.push(`weekEnd = '${goal.weekEnd.toISOString()}'`);
  }
  if (typeof goal.completed === "boolean") {
    updateFields.push(`completed = ${goal.completed ? 1 : 0}`);
  }
  if (typeof goal.goalPriority === "number") {
    updateFields.push(`goalPriority = ${goal.goalPriority}`);
  }
  if (typeof goal.monthlyGoalId === "string") {
    updateFields.push(`monthlyGoalId = "${goal.monthlyGoalId}"`);
  }
  if (typeof goal.tasks !== "undefined") {
    updateFields.push(`tasks = '${JSON.stringify(goal.tasks)}'`);
  }
  if (typeof goal.privacy === "string") {
    updateFields.push(`privacy = "${goal.privacy}"`);
  }

  return updateFields.join(", ");
};

export const deleteWeeklyGoalByIdQuery = (
  wGoalId: string,
  userId: string
): string => {
  try {
    return `DELETE FROM weeklyGoals WHERE wGoalId = "${wGoalId}" and creator = '${userId}';`;
  } catch (error) {
    throw error;
  }
};

export const getAllWeeklyGoalsQuery = (userId: string): string => {
  try {
    return `SELECT * FROM weeklyGoals where creator = '${userId}';`;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getWeeklyGoalByIdQuery = (
  wGoalId: string,
  userId: string
): string => {
  try {
    return `SELECT * FROM weeklyGoals WHERE wGoalId = "${wGoalId}" and creator = '${userId}';`;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
