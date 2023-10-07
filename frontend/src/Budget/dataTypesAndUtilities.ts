export interface PartialBudgetType {
  budgetId: string;
  budget: string;
  amount: number;
  paid: number;
}

export interface BudgetType extends PartialBudgetType {
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
