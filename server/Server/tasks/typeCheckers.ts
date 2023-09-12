const CONSTANT = {
  goalCategory: ["personal" , "fitness" , "family", "job", "project", "health", "other"],
  privacy: ["public", "private", "personal"],
  progress: ["In progress", "Completed", "not started"]
}

const verifyMonthlyTasksBreakdown =(input: any): MonthlyTasksBreakdown | null => {
  if (
    "taskName" in input &&
    typeof input.taskName === "string" &&
    input.taskName !== "" &&
    "taskDescription" in input &&
    typeof input.taskDescription === "string" &&
    input.taskDescription !== "" &&
    "taskOrder" in input &&
    typeof input.taskOrder === "number" &&
    "taskDuration" in input &&
    typeof input.taskDuration === "number"
  ) {
    return input;
  }
  return null;
}

const verifyWeeklyTaskBreakdown = (input: any): WeeklyTaskBreakdown | null => {
  if (
    verifyMonthlyTasksBreakdown(input) &&
    "dayOfWeek" in input &&
    typeof input.dayOfWeek === "string"
  ) {
    return input;
  }
  return null;
}

const verifyMonthlyGoalsType = (input: any): MonthlyGoalsType | null => {
  if (
    "goal" in input &&
    typeof input.goal === "string" &&
    input.goal !== "" &&
    "urgency" in input &&
    typeof input.urgency === "number" &&
    input.urgency >= 0 &&
    input.urgency <= 10 &&
    "importance" in input &&
    typeof input.importance === "number" &&
    input.importance >= 0 &&
    input.importance <= 10 &&
    "estimatedDuration" in input &&
    typeof input.estimatedDuration === "string" &&
    "tasksInGoal" in input &&
    Array.isArray(input.tasksInGoal) &&
    "estimatePeriodPerDay" in input &&
    typeof input.estimatePeriodPerDay === "number" &&
    "complete" in input &&
    typeof input.complete === "boolean" &&
    "goalCategory" in input &&
    typeof input.goalCategory === "string" &&
    CONSTANT.goalCategory.includes(input.goalCategory) &&
    "username" in input &&
    typeof input.username === "string" &&
    input.username !== "" &&
    "privacy" in input &&
    CONSTANT.privacy.includes(input.privacy)
  ) {
    
    return {...input, tasksInGoal: (input.tasksInGoal.length > 0? input.tasksInGoal: '[]'), goalPriority: input.urgency + input.importance}
  }
  return null;
}

export const verifyBodyForPostMonthly = (body:any) => {
    const success: MonthlyGoalsType[] = [];
    const failed:any = []
    body.forEach((element:any) => {
        const data = verifyMonthlyGoalsType(element)
        if(data){
            success.push(data)
        }else{
            failed.push(element)
        }
    });

    return {success, failed}

}

const verifyWeeklyGoal=(input: any): WeeklyGoal | null => {
  if (
    "goal" in input &&
    typeof input.goal === "string" &&
    input.goal !== "" &&
    "urgency" in input &&
    typeof input.urgency === "number" &&
    "importance" in input &&
    typeof input.importance === "number" &&
    "weekStart" in input &&
    input.weekStart instanceof Date &&
    "weekEnd" in input &&
    input.weekEnd instanceof Date &&
    "completed" in input &&
    typeof input.completed === "boolean" &&
    "monthlyGoalId" in input &&
    typeof input.monthlyGoalId === "string" &&
    input.monthlyGoalId !== "" &&
    "goalPriority" in input &&
    typeof input.goalPriority === "number" &&
    "tasks" in input &&
    Array.isArray(input.tasks) &&
    input.tasks.every((task: any) => verifyWeeklyTaskBreakdown(task))
  ) {
    return input;
  }
  return null;
}

const verifyTasks = (input: any): Tasks | null => {
  if (
    "tasksId" in input &&
    typeof input.tasksId === "number" &&
    "task" in input &&
    typeof input.task === "string" &&
    input.task !== "" &&
    "taskDate" in input &&
    input.taskDate instanceof Date &&
    "startingTime" in input &&
    typeof input.startingTime === "string" &&
    input.startingTime !== "" &&
    "complete" in input &&
    typeof input.complete === "boolean" &&
    "estimatedDuration" in input &&
    typeof input.estimatedDuration === "number" &&
    "goalId" in input &&
    typeof input.goalId === "string" &&
    input.goalId !== "" &&
    "progress" in input &&
    (input.progress === "In progress" ||
      input.progress === "Completed" ||
      input.progress === "not started")
  ) {
    return input;
  }
  return null;
}

export {verifyMonthlyGoalsType, verifyTasks, verifyWeeklyGoal, verifyWeeklyTaskBreakdown, verifyMonthlyTasksBreakdown}
