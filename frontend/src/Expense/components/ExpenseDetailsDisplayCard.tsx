import { Card } from "../../Components/ui/card";
import React from "react";
import { ExpenseType } from "../dataTypesAndUtilities";

const ExpenseDetailsDisplay = ({ expense }: { expense: ExpenseType }) => {
  return (
    <Card className="md:w-4/12 xl:w-5/12 shadow-xl">
      <div className="flex w-full justify-between items-center px-2 pt-4 pb-2">
        <div>
          <h1 className="text-xl font-bold capitalize">{expense.item}</h1>
          <p className="text-slate-400 text-sm">{expense.expensePrivacy}</p>
        </div>
        <span className="text-slate-600 text-sm">
          {new Date(expense.expenseDate as Date).toISOString().split("T")[0]}
        </span>
      </div>
      <div className="px-2 border-1 border-black">
        {expense.item}
      </div>
    </Card>
  );
};

export default ExpenseDetailsDisplay;
