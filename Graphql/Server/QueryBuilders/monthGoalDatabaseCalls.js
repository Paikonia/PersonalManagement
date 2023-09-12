const makeDatabaseCall = require("../database/mysqlIndex");

const insertMonthlyGoal = async (goalObject, userId) => {
  try {
    const parsed = parseMonthlyGoalInsertObject(goalObject, userId);
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

const parseMonthlyGoalInsertObject = (goal, userId) => {
  if (
    "mGoalId" in goal &&
    typeof goal.mGoalId === "string" &&
    "goal" in goal &&
    typeof goal.goal === "string" &&
    "urgency" in goal &&
    typeof goal.urgency === "number" &&
    "importance" in goal &&
    typeof goal.importance === "number" &&
    "tasksInGoal" in goal &&
    typeof goal.tasksInGoal === "object" &&
    "goalPriority" in goal &&
    typeof goal.goalPriority === "number" &&
    "goalCategory" in goal &&
    [
      "personal",
      "fitness",
      "family",
      "job",
      "project",
      "health",
      "other",
    ].includes(goal.goalCategory) &&
    "monthStart" in goal &&
    typeof goal.monthStart === "string" &&
    "privacy" in goal &&
    (goal.privacy === "public" || goal.privacy === "private")
  ) {
    return `INSERT INTO monthlyGoals(mGoalId, goal, urgency, importance, tasksInGoal, estimatePeriodPerDay, complete, \
      goalPriority, goalCategory, username, monthStart, privacy, creator) VALUES('${
        goal.mGoalId
      }', '${goal.goal}', \
      ${goal.urgency}, ${goal.importance}, '${JSON.stringify(
      goal.tasksInGoal
    )}', ${goal.estimatePeriodPerDay}, \
      ${goal.complete}, ${goal.goalPriority}, '${goal.goalCategory}', '${
      goal.username
    }', '${goal.monthStart}', \
      '${goal.privacy}', '${userId}');`;
  }
  return {};
};

const updateMonthlyGoal = async (mGoalId, updatedGoal) => {
  try {
    const parsed = parseMonthlyGoalUpdateObject(updatedGoal);
    if (Object.keys(parsed).length === 0) {
      return null;
    }

    await makeDatabaseCall(
      `UPDATE monthlyGoals SET ${parsed} WHERE mGoalId = '${mGoalId}';`
    );

    return parsed;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const parseMonthlyGoalUpdateObject = (goal) => {
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
  if ("tasksInGoal" in goal && typeof goal.tasksInGoal === "object") {
    updateFields.push(`tasksInGoal = '${JSON.stringify(goal.tasksInGoal)}'`);
  }
  if (
    "estimatePeriodPerDay" in goal &&
    typeof goal.estimatePeriodPerDay === "number"
  ) {
    updateFields.push(`estimatePeriodPerDay = ${goal.estimatePeriodPerDay}`);
  }
  if ("complete" in goal && typeof goal.complete === "boolean") {
    updateFields.push(`complete = ${goal.complete}`);
  }
  if ("goalPriority" in goal && typeof goal.goalPriority === "number") {
    updateFields.push(`goalPriority = ${goal.goalPriority}`);
  }
  if (
    "goalCategory" in goal &&
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
    updateFields.push(`goalCategory = '${goal.goalCategory}'`);
  }
  if ("monthStart" in goal && typeof goal.monthStart === "string") {
    updateFields.push(`monthStart = '${goal.monthStart}'`);
  }
  if (
    "privacy" in goal &&
    (goal.privacy === "public" || goal.privacy === "private")
  ) {
    updateFields.push(`privacy = '${goal.privacy}'`);
  }

  return updateFields.join(", ");
};

const deleteMonthlyGoalById = async (mGoalId) => {
  try {
    await makeDatabaseCall(
      `DELETE FROM monthlyGoals WHERE mGoalId = '${mGoalId}';`
    );
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getAllMonthlyGoals = async () => {
  try {
    const goals = await makeDatabaseCall("SELECT * FROM monthlyGoals;");
    return goals;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getMonthlyGoalById = async (mGoalId) => {
  try {
    const goal = await makeDatabaseCall(
      `SELECT * FROM monthlyGoals WHERE mGoalId = '${mGoalId}';`
    );
    return goal;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = {getAllMonthlyGoals, getMonthlyGoalById, updateMonthlyGoal, deleteMonthlyGoalById, insertMonthlyGoal};
