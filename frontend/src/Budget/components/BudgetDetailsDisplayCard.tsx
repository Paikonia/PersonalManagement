import { Card } from "../../Components/ui/card";
import React from "react";
import { BudgetType } from "../dataTypesAndUtilities";

const BudgetDetailsDisplay = ({ budget }: { budget: BudgetType }) => {
  console.log('Hello World: ', budget.expenseCategory)
  return (
    <Card className="w-full border-2 h-48">
      <div className="flex w-full justify-between items-center px-2 pt-4 pb-2">
        <div>
          <h1 className="text-xl font-bold capitalize">{budget.budget}</h1>
          <p className="text-slate-400 text-sm">{budget.budgetPrivacy}</p>
        </div>
        <span className="text-slate-600 text-sm">
          {new Date(budget.dateOfPayment as Date).toISOString().split("T")[0]}
        </span>
      </div>
      <div className="px-2 w-full flex justify-between">
        <p className="text-xl text-black">{budget.expenseCategory}</p>
        <p className="text-md text-gray-600">{budget.goalId}</p>
      </div>
      <div className="px-2 w-full flex justify-between">
        <p className="text-xl text-black">UGX. {budget.amount}</p>
        <p className="text-md text-gray-600">{budget.paid? 'Paid': 'Pending'}</p>
      </div>
    </Card>
  );
};

export default BudgetDetailsDisplay;
