import EditDeleteButtons from "../../Components/EditDeleteButtons";
import React from "react";
import { BudgetType, PartialBudgetType } from "../dataTypesAndUtilities";
import { Card } from "../../Components/ui/card";

const BudgetDisplayCard = ({
  budget,
  handleClick,
  currentBudget,
}: {
  budget: PartialBudgetType;
  handleClick: (id: string) => void;
  currentBudget: BudgetType | null | undefined;
}) => {
  console.log(budget);
  return (
    <Card
      onClick={() => {
        handleClick(budget.budgetId);
      }}
      className="border-2 bg-gray-200 hover:bg-gray-300 overflow-hidden w-full rounded-xl p-2 mb-4"
    >
      <div className="flex justify-between">
        <div className="flex w-full px-1 py-0 left-0 justify-start items-center">
          <input type="checkbox" className="w-4" />
          <div className="w-ful px-2 flex justify-between w-full">
            <p>{budget.budget}</p>
            <p>Amount: {budget.amount}</p>
          </div>
        </div>
        <EditDeleteButtons />
      </div>
      {currentBudget && currentBudget.budgetId === budget.budgetId ? (
        <Card className="p-2 my-2">
          <div className="flex mb-2 justify-between">
            <p>Category: {currentBudget.expenseCategory}</p>
            <p>
              Date:{" "}
              {
                new Date(currentBudget?.dateOfPayment || Date.now())
                  .toISOString()
                  .split("T")[0]
              }
            </p>
          </div>
          <div className="flex justify-between">
            <p>Paid: {budget.paid ? "Pending" : "Paid"}</p>
            <p>Privacy: {currentBudget.budgetPrivacy}</p>
          </div>
        </Card>
      ) : (
        <></>
      )}
    </Card>
  );
};

export default BudgetDisplayCard;
