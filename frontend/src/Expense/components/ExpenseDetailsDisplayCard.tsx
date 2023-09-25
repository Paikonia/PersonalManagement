import { Card } from "../../Components/ui/card";
import React from "react";
import { ExpenseType } from "../dataTypesAndUtilities";

const ExpenseDetailsDisplay = ({ expense }: { expense: ExpenseType }) => {
  return (
    <Card className="w-full h-48 border-2">
      <div className="flex w-full justify-between items-center px-2 pt-4 pb-2">
        <div>
          <h1 className="text-xl font-bold capitalize">{expense.item}</h1>
          <p className="text-slate-400 text-sm">{expense.expensePrivacy}</p>
        </div>
        <span className="text-slate-600 text-sm">
          {new Date(expense.expenseDate as Date).toISOString().split("T")[0]}
        </span>
      </div>
      <div className="px-2 w-full flex justify-between">
        <p className="text-xl text-black">{expense.item}</p>
        <p className="text-md text-gray-600">{expense.expenseCategory}</p>
      </div>
      <div className="px-2 w-full flex justify-between">
        <p className="text-xl text-black">UGX. {expense.amount}</p>
        <p className="text-md text-gray-600">{expense.budgetId}</p>
      </div>
    </Card>
  );
};

export default ExpenseDetailsDisplay;
