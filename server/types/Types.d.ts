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
