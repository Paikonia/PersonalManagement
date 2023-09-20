import React from "react";
import EditDeleteButtons from "./EditDeleteButtons";

interface BudgetDisplayType {
  budgetId: string;
  budget: string;
  amount: number;
  paid: boolean;
  expenseCategeory:
    | "Food"
    | "Clothing"
    | "Family"
    | "Academics"
    | "Living"
    | "Travel";
}

const BudgetDisplay = ({
  budgetId,
  budget,
  amount,
  paid,
  expenseCategeory,
}: BudgetDisplayType) => {
  return (
    <div className="border-2 md:w-7/12 xl:w-5/12 overflow-hidden rounded-xl p-2 flex  mb-4 justify-between">
      <div className="flex w-10/12 sm:w-10/12 md:w-11/12 xl:w-5/6 px-1 py-0 left-0 justify-start items-center">
        <input type="checkbox" className="mx-1" name={budgetId} id={budgetId} />
        <p className="ml-2 w-30  sm:w-42 max-w-xs mr-2 truncate">{budget}</p>
        <h3 className="mr-2 w-20">{paid ? "Paid" : "Pending"}</h3>
        <p className="w-30 text-sm hidden sm:inline-block truncate sm:w-36 text-center ">
          {expenseCategeory}
        </p>
        <p>{amount}</p>
      </div>
      <EditDeleteButtons />
    </div>
  );
};

export default BudgetDisplay;
