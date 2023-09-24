export interface PartialExpenseType {
  expenseId: string;
  item: string;
  amount: number;
  paymentMethod: "Cash" | "Card" | "Credit";
  expenseDate: Date;
}

export interface ExpenseType extends PartialExpenseType {
  
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


