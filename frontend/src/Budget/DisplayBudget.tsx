import React, { useState } from "react";
import useFetch from "../utils/fetch";
import { Card } from "../Components/ui/card";
import { Button } from "../Components/ui/button";
import { Pencil } from 'lucide-react'
import BudgetDisplayCard from "./components/BudgetDisplayCard";


const DisplayBudget = ({
  budgets,
  changeToAdd,
}: {
  budgets: PartialBudgetType[];
  changeToAdd: ()=> void;
}) => {
  const [currentBudget, setCurrentBudget] = useState<BudgetType>();
  const fetch = useFetch();
  const handleBudgetClick = async (id: string) => {
    const specificNote = await fetch(`/budget/${id}`);
    setCurrentBudget(specificNote);
  };
  return (
    <div className="w-full">
      <Button onClick={changeToAdd}>
        <Pencil /> Add Budget
      </Button>
      <div className={` my-2`}>
        <Card className={`mx-1 p-4 w-full border-2`}>
          {budgets.map((budget: PartialBudgetType) => (
            <BudgetDisplayCard
              budget={budget}
              handleClick={handleBudgetClick}
              currentBudget={currentBudget}
            />
          ))}
        </Card>
      </div>
    </div>
  );
};

export default DisplayBudget;
