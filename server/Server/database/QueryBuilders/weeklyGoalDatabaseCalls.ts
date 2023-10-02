export const insertWeeklyGoalQueryBuilder = (
  weeklyGoalObjects: WeeklyGoalType[],
  userId: string
): { query: string; failed: WeeklyGoalType[]; params: Array<any> } => {
  try {
    const data: {
      success: WeeklyGoalType[];
      failed: WeeklyGoalType[];
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
    const condition = data.success
      .map(() => "(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)")
      .join(", ");
    const params = data.success
      .map((success) => insertWeeklyGoalQueryString(success, userId))
      .flat();

    const query = `INSERT INTO weeklyGoals(goal, urgency, importance, weekStart, weekEnd, completed, monthlyGoalId, tasks, privacy, creator) \
    VALUES ${condition};`;
    return {
      query: params.length > 0 ? query : "",
      failed: data.failed,
      params,
    };
  } catch (error) {
    throw error;
  }
};

const parseWeeklyGoalInsertObject = (goal: WeeklyGoalType): boolean => {
  if (
    typeof goal.goal === "string" &&
    goal.goal.trim() !== "" &&
    (typeof goal.urgency === "number" || typeof goal.urgency === "string") &&
    (typeof goal.importance === "number" ||
      typeof goal.importance === "string") &&
    typeof goal.weekStart === "string" &&
    goal.weekStart.trim() !== "" &&
    typeof goal.weekEnd === "string" &&
    goal.weekEnd.trim() !== "" &&
    typeof goal.completed === "boolean" &&
    typeof goal.monthlyGoalId === "string" &&
    goal.monthlyGoalId.trim() !== "" &&
    ["private", "public"].includes(goal.privacy)
  ) {
    return true;
  }
  return false;
};

const insertWeeklyGoalQueryString = (
  goal: WeeklyGoalType,
  userId: string
): Array<any> => {
  return [
    goal.goal,
    goal.urgency,
    goal.importance,
    new Date(goal.weekStart).toISOString().split("T")[0],
    new Date(goal.weekEnd).toISOString().split("T")[0],
    goal.completed,
    goal.monthlyGoalId,
    JSON.stringify(goal.tasks || []),
    goal.privacy,
    userId,
  ];
};

export const updateWeeklyGoal = (
  wGoalId: string,
  updatedGoal: Partial<WeeklyGoalType>,
  userId: string
): { query: string; params: any[] } | null => {
  try {
    const parsed = parseWeeklyGoalUpdateObject(updatedGoal);
    if (Object.keys(parsed).length === 0) {
      return null;
    }

    return {
      query: `UPDATE weeklyGoals SET ${parsed.placeholder} WHERE wGoalId = ? and creator = ?;`,
      params: [...parsed.updateFields, wGoalId, userId],
    };
  } catch (error) {
    throw error;
  }
};

const parseWeeklyGoalUpdateObject = (goal: Partial<WeeklyGoalType>) => {
  const updateFields = [];
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
  if (typeof goal.weekStart === "string") {
    const weekStart = new Date(goal.weekStart).toISOString().split("T")[0];
    updateFields.push(weekStart);
    placeholder.push("weekStart = ?");
  }
  if (typeof goal.weekEnd === "string") {
    const weekEnd = new Date(goal.weekEnd).toISOString().split("T")[0];
    updateFields.push(weekEnd);
    placeholder.push("weekEnd = ?");
  }
  if (typeof goal.completed === "boolean") {
    updateFields.push(goal.completed);
    placeholder.push("completed = ?");
  }

  if (typeof goal.monthlyGoalId === "string") {
    updateFields.push(goal.monthlyGoalId);
    placeholder.push("monthlyGoalId = ?");
  }
  if (typeof goal.tasks !== "undefined") {
    const tasks = JSON.stringify(goal.tasks);
    updateFields.push(tasks);
    placeholder.push("tasks = ?");
  }
  if (typeof goal.privacy === "string") {
    updateFields.push(goal.privacy);
    placeholder.push("privacy = ?");
  }

  return { updateFields, placeholder: placeholder.join(", ") };
};

export const deleteWeeklyGoalByIdQuery = (
  wGoalId: string[],
  userId: string
): { delete: string; data: string; params: any[] } => {
  try {
    const condition = wGoalId.map((id) => "?").join(", ");
    return {
      delete: `DELETE FROM weeklyGoals WHERE wGoalId in (${condition}) and creator = ?;`,
      data: `select * FROM weeklyGoals WHERE wGoalId in (${condition}) and creator = ?;`,
      params: [...wGoalId, userId],
    };
  } catch (error) {
    throw error;
  }
};

export const getAllWeeklyGoalsQuery = (
  userId: string
): { query: string; params: any[] } => {
  try {
    return {
      query: `SELECT * FROM weeklyGoals where creator = ?;`,
      params: [userId],
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getWeeklyGoalByIdQuery = (
  wGoalId: string,
  userId: string
): { query: string; params: any[] } => {
  try {
    return {
      query: `SELECT * FROM weeklyGoals WHERE wGoalId = ? and creator = ?;`,
      params: [wGoalId, userId],
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};
