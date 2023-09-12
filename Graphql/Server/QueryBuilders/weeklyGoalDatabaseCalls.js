const makeDatabaseCall = require("../database/mysqlIndex");

const insertWeeklyGoal = async (goalObject, userId) => {
  try {
    const parsed = parseWeeklyGoalInsertObject(goalObject, userId);
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

const parseWeeklyGoalInsertObject = (goal, userId) => {
  if (
    "wGoalId" in goal &&
    typeof goal.wGoalId === "string" &&
    "goal" in goal &&
    typeof goal.goal === "string" &&
    "urgency" in goal &&
    typeof goal.urgency === "number" &&
    "importance" in goal &&
    typeof goal.importance === "number" &&
    "weekStart" in goal &&
    typeof goal.weekStart === "string" &&
    "weekEnd" in goal &&
    typeof goal.weekEnd === "string" &&
    "monthlyGoalId" in goal &&
    "goalPriority" in goal &&
    typeof goal.goalPriority === "number" &&
    "tasks" in goal &&
    typeof goal.tasks === "object" &&
    "privacy" in goal &&
    (goal.privacy === "public" || goal.privacy === "private")
  ) {
    return `INSERT INTO weeklyGoals(wGoalId, goal, urgency, importance, weekStart, weekEnd, completed, \
      monthlyGoalId, goalPriority, tasks, privacy, creator) VALUES('${
        goal.wGoalId
      }', '${goal.goal}', \
      ${goal.urgency}, ${goal.importance}, '${goal.weekStart}', '${
      goal.weekEnd
    }', ${goal.completed}, \
      '${goal.monthlyGoalId}', ${goal.goalPriority}, '${JSON.stringify(
      goal.tasks
    )}', \
      '${goal.privacy}', '${userId}');`;
  }
  return {};
};

const updateWeeklyGoal = async (wGoalId, updatedGoal) => {
  try {
    const parsed = parseWeeklyGoalUpdateObject(updatedGoal);
    if (Object.keys(parsed).length === 0) {
      return null;
    }

    await makeDatabaseCall(
      `UPDATE weeklyGoals SET ${parsed} WHERE wGoalId = '${wGoalId}';`
    );

    return parsed;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const parseWeeklyGoalUpdateObject = (goal) => {
  const updateFields = [];
  if ("goal" in goal && typeof goal.goal === "string") {
    updateFields.push(`goal = '${goal.goal}'`);
  }
  if ("urgency" in goal && typeof goal.urgency === "number") {
    updateFields.push(`urgency = ${goal.urgency}`);
  }
  if ("importance" in goal && typeof goal.importance === "number") {
    updateFields.push(`importance = ${goal.importance}`);
  }
  if ("weekStart" in goal && typeof goal.weekStart === "string") {
    updateFields.push(`weekStart = '${goal.weekStart}'`);
  }
  if ("weekEnd" in goal && typeof goal.weekEnd === "string") {
    updateFields.push(`weekEnd = '${goal.weekEnd}'`);
  }
  if ("completed" in goal && typeof goal.completed === "boolean") {
    updateFields.push(`completed = ${goal.completed}`);
  }
  if ("monthlyGoalId" in goal) {
    updateFields.push(`monthlyGoalId = '${goal.monthlyGoalId}'`);
  }
  if ("goalPriority" in goal && typeof goal.goalPriority === "number") {
    updateFields.push(`goalPriority = ${goal.goalPriority}`);
  }
  if ("tasks" in goal && typeof goal.tasks === "object") {
    updateFields.push(`tasks = '${JSON.stringify(goal.tasks)}'`);
  }
  if (
    "privacy" in goal &&
    (goal.privacy === "public" || goal.privacy === "private")
  ) {
    updateFields.push(`privacy = '${goal.privacy}'`);
  }

  return updateFields.join(", ");
};

const deleteWeeklyGoalById = async (wGoalId) => {
  try {
    await makeDatabaseCall(
      `DELETE FROM weeklyGoals WHERE wGoalId = '${wGoalId}';`
    );
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getAllWeeklyGoals = async () => {
  try {
    const goals = await makeDatabaseCall("SELECT * FROM weeklyGoals;");
    return goals;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getWeeklyGoalById = async (wGoalId) => {
  try {
    const goal = await makeDatabaseCall(
      `SELECT * FROM weeklyGoals WHERE wGoalId = '${wGoalId}';`
    );
    return goal;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = { insertWeeklyGoal, getAllWeeklyGoals, getWeeklyGoalById, updateWeeklyGoal, deleteWeeklyGoalById};
