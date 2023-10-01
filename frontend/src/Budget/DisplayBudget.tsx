import React, { useEffect, useState } from "react";
import { BudgetType, PartialBudgetType } from "./dataTypesAndUtilities";
import useFetch from "../utils/fetch";
import { Card } from "../Components/ui/card";
import { Button } from "../Components/ui/button";
import { Pencil } from 'lucide-react'
import BudgetDisplayCard from "./components/BudgetDisplayCard";
import BudgetDetailsDisplay from "./components/BudgetDetailsDisplayCard";


const DisplayBudget = ({
  budgets,
  changeToAdd,
}: {
  budgets: PartialBudgetType[];
  changeToAdd: ()=> void;
}) => {
  const [budget, setBudget] = useState<BudgetType>();
  const fetch = useFetch();
  const handleBudgetClick = async (id: string) => {
    const specificNote = await fetch(`/budget/${id}`);
    setBudget(specificNote);
  };
  return (
    <div className="w-full">
      <Button onClick={changeToAdd}>
        <Pencil /> Add Budget
      </Button>
      <div className={`${budget ? "main-displays" : ""} my-2`}>
        <Card className={`mx-1 p-4 w-full border-2`}>
          {budgets.map((budget: PartialBudgetType) => (
            <BudgetDisplayCard
              budget={budget}
              handleClick={handleBudgetClick}
            />
          ))}
        </Card>
        <>{budget && <BudgetDetailsDisplay budget={budget} />}</>
      </div>
    </div>
  );
};

export default DisplayBudget;
