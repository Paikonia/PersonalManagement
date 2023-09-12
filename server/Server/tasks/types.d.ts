interface MonthlyTasksBreakdown {
  taskName: string;
  taskDescription: string;
  taskOrder: number;
  taskDuration: number;
}

interface WeeklyTaskBreakdown extends MonthlyTasksBreakdown {
  dayOfWeek: "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";
} 

interface MonthlyGoalsType {
  mGoalId: string;
  goal: string;
  urgency: number;
  importance: number;
  estimatedDuration: string;
  tasksInGoal: MonthlyTasksBreakdown[];
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
  privacy: "public" | "private" | "personal";
  monthStart: Date
}

interface WeeklyGoal {
  wGoalId: string;
  goal: string;
  urgency: number;
  importance: number;
  weekStart: Date;
  weekEnd: Date;
  completed: boolean;
  monthlyGoalId: string;
  goalPriority: number;
  tasks: WeeklyTaskBreakdown[];
}

interface Tasks {
  tasksId: number;
  task: string;
  taskDate: Date;
  startingTime: string;
  complete: boolean;
  estimatedDuration: number;
  goalId: string;
  progress: "In progress" | "Completed" | "not started";
}
