interface BudgetType {
  budgetId: string;
  budget: string;
  amount: number;
  dateOfPayment: Date;
  goalId: string;
  paid: boolean;
  expenseCategeory:
    | "Food"
    | "Clothing"
    | "Family"
    | "Academics"
    | "Living"
    | "Travel";
  budgetPrivacy: "private" | "public";
  creator: string;
}

interface NoteType {
  noteId: number;
  title: string;
  note: string | null;
  dateCreated: Date | null;
  media: any;
  notePrivacy: "private" | "public";
  creator: string;
}

interface ExpenseType {
  expenseId: string;
  budgetId: string | null;
  item: string;
  amount: number;
  expenseDate: Date;
  paymentMethod: "Cash" | "Card" | "Credit";
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


interface UpdateReturnType {
  success: string;
  message: string;
  failed: any[];
}

interface TaskType {
  taskId: number;
  task: string;
  taskDate: string;
  startingTime: string;
  estimatedDuration: number;
  goalId: string;
  progress: "In progress" | "Completed" | "Not Started";
  privacy: "private" | "public";
  creator: string;
}

interface WeeklyGoalType {
  wGoalId: string;
  goal: string;
  urgency: number;
  importance: number;
  weekStart: string;
  weekEnd: string;
  completed: boolean;
  monthlyGoalId: string;
  goalPriority: number;
  tasks: any;
  privacy: "private" | "public";
  creator: string;
}



