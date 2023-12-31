interface PartialProjectTypes {
  mGoalId: string;
  goal: string;
  goalPriority: number;
}

interface ProjectTypes extends PartialProjectTypes {
  urgency: number;
  estimatedDuration: string;
  importance: number;
  tasksInGoal: any;
  estimatePeriodPerDay: number;
  complete: boolean;
  goalCategory:
    | "personal"
    | "fitness"
    | "family"
    | "job"
    | "project"
    | "health"
    | "other";
  monthStart: string;
  privacy: "private" | "public";
}
interface PartialExpenseType {
  expenseId: string;
  item: string;
  amount: number;
  paymentMethod: "Cash" | "Card" | "Credit";
  expenseDate: string;
}

interface ExpenseType extends PartialExpenseType {
  budgetId: string | null;
  expenseCategory:
    | "Food"
    | "Clothing"
    | "Family"
    | "Academics"
    | "Living"
    | "Travel";
  expensePrivacy: "private" | "public";
  creator: string;
}

 interface PartialBudgetType {
   budgetId: string;
   budget: string;
   amount: number;
   paid: boolean;
 }

 interface BudgetType extends PartialBudgetType {
   dateOfPayment: string;
   goalId: string;
   expenseCategory:
     | "Food"
     | "Clothing"
     | "Family"
     | "Academics"
     | "Living"
     | "Travel";
   budgetPrivacy: "private" | "public";
   creator: string;
 }

interface PartialGoalsTypes {
  wGoalId: string;
  goal: string;
  completed: boolean;
  goalPriority: string;
}

interface GoalsTypes extends PartialGoalsTypes {
  urgency: number;
  importance: number;
  weekStart: string;
  weekEnd: string;
  monthlyGoalId: string;
  tasks: any[];
  privacy: "private" | "public";
}


interface PartialTaskType {
  tasksId: number;
  task: string;
  progress: "In progress" | "Completed" | "Not Started";
}
interface TaskType extends PartialTaskType {
  taskDate: string;
  startingTime: string;
  estimatedDuration: number;
  goalId: string;
  privacy: "private" | "public";
}

interface PartialNoteType {
  noteId: string;
  title: string;
  dateCreated: string;
  note: string;
  media: any;
  notePrivacy: "private" | "public";
  creator: string;
}

interface NotesType extends PartialNoteType {
  
}

