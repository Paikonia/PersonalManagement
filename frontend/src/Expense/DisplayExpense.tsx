import { useState } from "react";
import { Pencil } from "lucide-react";

import { Card } from "../Components/ui/card";
import ExpenseDisplayCard from "./components/ExpenseDisplayCard";
import { Link } from "react-router-dom";

const DisplayExpense = ({ expenses }: { expenses: ExpenseType[] }) => {
  const [currentExpense, setCurrentExpense] = useState<ExpenseType>();

  const handleClick = (id: string) => {
    const expense = expenses.find((expense) => expense.expenseId === id);
    setCurrentExpense(expense);
  };

  return (
    <div className="w-full">
      <Link className="btn" to={"compose"}>
        <Pencil /> Add Expense
      </Link>
      <div className={`my-2`}>
        <Card className={`mx-1 p-4 w-full border-2`}>
          {expenses.map((expense: PartialExpenseType) => (
            <ExpenseDisplayCard
              currentExpense={currentExpense}
              expense={expense}
              handleClick={handleClick}
            />
          ))}
        </Card>
      </div>
    </div>
  );
};

export default DisplayExpense;
