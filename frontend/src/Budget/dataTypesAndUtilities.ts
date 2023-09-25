export interface PartialBudgetType {
  budgetId: string;
  budget: string;
  amount: number;
  paid: boolean;
}

export interface BudgetType extends PartialBudgetType {
  dateOfPayment: Date;
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
