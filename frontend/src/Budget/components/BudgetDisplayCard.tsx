import EditDeleteButtons from "../../Components/EditDeleteButtons";
import React from "react";
import { PartialBudgetType } from "../dataTypesAndUtilities";
import { Card } from "../../Components/ui/card";

const BudgetDisplayCard = ({
  budget,
  handleClick,
}: {
  budget: PartialBudgetType;
  handleClick: (id:string) => void
}) => {
  console.log(budget);
  return (
    <Card
      onClick={() => {
        handleClick(budget.budgetId);
      }}
      className="border-2 hover:bg-gray-300 overflow-hidden w-full rounded-xl p-2 flex  mb-4 justify-between"
    >
      <div className="flex w-full px-1 py-0 left-0 justify-start items-center">
        <input type="checkbox" className="w-4" />
        <div className="w-ful grid-expense-card">
          <p>{budget.budget}</p>
          <p>{budget.amount}</p>
          <p>{budget.paid? 'Pending': 'Paid'}</p>
        </div>
      </div>
      <EditDeleteButtons />
    </Card>
  );
};

export default BudgetDisplayCard;
