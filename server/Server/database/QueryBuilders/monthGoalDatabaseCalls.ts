export const insertMonthlyGoalQueryBuilder = (
  monthlyGoalObjects: any[],
  userId: string
): { query: string; failed: MonthlyGoalsType[]; params: Array<any> } => {
  try {
    const data: {
      success: MonthlyGoalsType[];
      failed: MonthlyGoalsType[];
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

    const placeholder = data.success
      .map(() => "(?,?, ?, ?, ?, ?, ?, ?, ?, ?,?)")
      .join(", ");
    const params = data.success
      .map((success) => insertMonthlyGoalQueryString(success, userId))
      .flat();
    const query = `INSERT INTO monthlyGoals(goal, urgency, importance, tasksInGoal, estimatePeriodPerDay, complete,  goalCategory, monthStart, estimatedDuration, privacy, creator) \
    VALUES ${placeholder};`;
    return {
      query: placeholder !== ''? query: '',
      failed: data.failed,
      params,
    };
  } catch (error) {
    throw error;
  }
};

const parseMonthlyGoalInsertObject = (goal: any): boolean => {
  if (
    typeof goal.goal === "string" &&
    goal.goal.trim() !== "" &&
    typeof goal.estimatedDuration === "string" &&
    goal.estimatedDuration.trim() !== "" &&
    (typeof goal.urgency === "number" || typeof goal.urgency === "string") &&
    (typeof goal.importance === "number" ||
      typeof goal.importance === "string") &&
    (typeof goal.estimatePeriodPerDay === "number" ||
      typeof goal.estimatePeriodPerDay === "string") &&
    typeof goal.complete === "boolean" &&
    [
      "personal",
      "fitness",
      "family",
      "job",
      "project",
      "health",
      "other",
    ].includes(goal.goalCategory) &&
    typeof goal.monthStart === "string" &&
    ["private", "public"].includes(goal.privacy)
  ) {
    return true;
  }
  return false;
};

const insertMonthlyGoalQueryString = (
  goal: MonthlyGoalsType,
  userId: string
) => {
  return [
    goal.goal,
    goal.urgency,
    goal.importance,
    JSON.stringify(goal.tasksInGoal || "[]"),
    goal.estimatePeriodPerDay,
    goal.complete ? 1 : 0,
    goal.goalCategory,
    new Date(goal.monthStart).toISOString().split("T")[0],
    goal.estimatedDuration,
    goal.privacy,
    userId,
  ];
};

export const updateMonthlyGoal = (
  mGoalId: string,
  updatedGoal: object,
  userId: string
): { query: string; params: Array<any> } | null => {
  try {
    const parsed = parseMonthlyGoalUpdateObject(updatedGoal);
    if (Object.keys(parsed).length === 0) {
      return null;
    }

    return {
      query: `UPDATE monthlyGoals SET ${parsed.placeholder} WHERE mGoalId = ? and creator = ?;`,
      params: [...parsed.updateFields, mGoalId, userId],
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const parseMonthlyGoalUpdateObject = (goal: Partial<MonthlyGoalsType>) => {
  const updateFields: any[] = [];
  const placeholder = [];
  if (typeof goal.goal === "string") {
    updateFields.push(goal.goal);
    placeholder.push("goal = ?");
  }
  if (typeof goal.urgency === "number" || typeof goal.urgency === "string") {
    updateFields.push(Number(goal.urgency));
    placeholder.push("urgency = ?");
  }
  if (
    typeof goal.importance === "number" ||
    typeof goal.importance === "string"
  ) {
    updateFields.push(Number(goal.importance));
    placeholder.push("importance = ?");
  }
  if (typeof goal.estimatePeriodPerDay === "number") {
    updateFields.push(goal.estimatePeriodPerDay);
    placeholder.push("estimatePeriodPerDay = ?");
  }
  if (typeof goal.complete === "boolean") {
    updateFields.push(goal.complete);
    placeholder.push("complete = ?");
  }
  if (typeof goal.goalPriority === "number") {
    updateFields.push(goal.goalPriority);
    placeholder.push("goalPriority = ?");
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
    updateFields.push(goal.goalCategory);
    placeholder.push("goalCategory = ?");
  }
  if (typeof goal.monthStart === "string") {
    // updateFields.push(
    //   `monthStart = '${new Date(goal.monthStart).toISOString()}'`
    // );
    updateFields.push(goal.monthStart);
    placeholder.push("monthStart = ?");
  }
  if (typeof goal.privacy === "string") {
    updateFields.push(goal.privacy);
    placeholder.push("privacy = ?");
  }

  return { updateFields, placeholder: placeholder.join(", ") };
};

export const deleteMonthlyGoalByIdQuery = (
  mGoalId: Array<string>,
  userId: string
): { delete: string; data: string; params: Array<any> } => {
  try {
    const condition = mGoalId.map(() => `?`).join(", ");
    return {
      delete: `DELETE FROM monthlyGoals WHERE mGoalId in (${condition}) and creator = ?;`,
      data: `select * FROM monthlyGoals WHERE mGoalId in (${condition}) and creator = ?;`,
      params: [...mGoalId, userId],
    };
  } catch (error) {
    throw error;
  }
};

export const getAllMonthlyGoalsQuery = (
  userId: string
): { query: string; params: Array<any> } => {
  try {
    return {
      query: `SELECT * FROM monthlyGoals where creator = ?;`,
      params: [userId],
    };
  } catch (error) {
    throw error;
  }
};

export const getMonthlyGoalByIdQuery = (
  mGoalId: string,
  userId: string
): { query: string; params: Array<any> } => {
  try {
    return {
      query: `SELECT * FROM monthlyGoals WHERE mGoalId = ? and creator = ?;`,
      params: [mGoalId, userId],
    };
  } catch (error) {
    throw error;
  }
};
