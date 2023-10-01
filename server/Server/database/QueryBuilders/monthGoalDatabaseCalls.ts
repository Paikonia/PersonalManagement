import { generateRandomAlphanumeric } from "../../utilities/generators";

interface MonthlyGoalType {
  mGoalId: string;
  goal: string;
  urgency: number;
  importance: number;
  tasksInGoal: any; 
  estimatePeriodPerDay: number;
  complete: boolean;
  goalPriority: number;
  goalCategory:
    | "personal"
    | "fitness"
    | "family"
    | "job"
    | "project"
    | "health"
    | "other";
  username: string;
  monthStart: Date;
  privacy: "private" | "public";
  creator: string;
}

export const insertMonthlyGoalQueryBuilder = (
  monthlyGoalObjects: MonthlyGoalType[],
  userId: string
): { query: string, failed: MonthlyGoalType[] } => {
  try {
    const data: {
      success: MonthlyGoalType[],
      failed: MonthlyGoalType[],
    } = {
      success: [],
      failed: [],
    };

    monthlyGoalObjects.forEach((goal) => {
      if (parseMonthlyGoalInsertObject(goal)) {
        data.success.push(goal);
      } else {
        data.failed.push(goal);
      }
    });

    const placeholder = data.success.map(()=> "(?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?)").join(", ")
    const parsedString = data.success
      .map((success) => insertMonthlyGoalQueryString(success, userId))
      .flat();
    const query = `INSERT INTO monthlyGoals(goal, urgency, importance, tasksInGoal, estimatePeriodPerDay, complete, goalPriority, goalCategory, monthStart, privacy, creator) \
    VALUES ${placeholder};`;
    return {
      query,
      failed: data.failed,
    };
  } catch (error) {
    throw error;
  }
};

const parseMonthlyGoalInsertObject = (goal: MonthlyGoalType): boolean => {
  if (
    typeof goal.goal !== "string" ||
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
    !["private", "public"].includes(goal.privacy) 
  ) {
    return false;
  }
  return true;
};

const insertMonthlyGoalQueryString = (
  goal: MonthlyGoalType,
  userId: string
) => {
  return [ goal.goal,goal.urgency, goal.importance, JSON.stringify(goal.tasksInGoal || '[]'), goal.estimatePeriodPerDay, goal.complete ? 1 : 0, goal.goalPriority, goal.goalCategory, goal.username, goal.monthStart.toISOString(), goal.privacy, userId];
};

export const updateMonthlyGoal = (
  mGoalId: string,
  updatedGoal: Partial<MonthlyGoalType>,
  userId: string
): string | null => {
  try {
    const parsed = parseMonthlyGoalUpdateObject(updatedGoal);
    if (Object.keys(parsed).length === 0) {
      return null;
    }

    return `UPDATE monthlyGoals SET ${parsed} WHERE mGoalId = "${mGoalId}" and creator = '${userId}';`;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const parseMonthlyGoalUpdateObject = (goal: Partial<MonthlyGoalType>) => {
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
  if (
    typeof goal.goalCategory === "string" &&
    [
      "personal",
      "fitness",
      "family",
      "job",
      "project",
      "health",
      "other",
    ].includes(goal.goalCategory)
  ) {
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

export const deleteMonthlyGoalByIdQuery = (
  mGoalId: string,
  userId: string
): string => {
  try {
    return `DELETE FROM monthlyGoals WHERE mGoalId = "${mGoalId}" and creator = '${userId}';`;
  } catch (error) {
    throw error;
  }
};

export const getAllMonthlyGoalsQuery = (userId: string): string => {
  try {
    return `SELECT * FROM monthlyGoals where creator = '${userId}';`;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getMonthlyGoalByIdQuery = (
  mGoalId: string,
  userId: string
): string => {
  try {
    return `SELECT * FROM monthlyGoals WHERE mGoalId = "${mGoalId}" and creator = '${userId}';`;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
