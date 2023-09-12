const monthlyInsert =
  "goal,urgency,importance,tasks_in_goal,estimate_period_per_day,complete,goal_priority,goal_category,username,privacy,month_start";

export const insertQueryBuilder = (input: MonthlyGoalsType[]): string => {
  const values = input
    .map((value) => {
      return builderInsertValues(value);
    })
    .join(", ");
  return `insert into monthly_goals (${monthlyInsert}) values ${values}`;
};

const builderInsertValues = (value: MonthlyGoalsType): string => {
  return `('${value.goal}', ${value.urgency}, ${value.importance}, '${value.tasksInGoal}', ${value.estimatePeriodPerDay},${value.complete}, ${value.goalPriority},'${value.goalCategory}','${value.username}', '${value.privacy}', '${value.monthStart}')`;
};
