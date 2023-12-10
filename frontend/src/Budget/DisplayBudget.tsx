import { useState } from "react";
import { Card } from "../Components/ui/card";
import { Pencil } from 'lucide-react'
import BudgetDisplayCard from "./components/BudgetDisplayCard";
import { Link } from "react-router-dom";


const DisplayBudget = ({
  budgets,
}: {
  budgets: BudgetType[];
}) => {
  const [currentBudget, setCurrentBudget] = useState<BudgetType>();
  const handleBudgetClick = async (id: string) => {
    const budget = budgets.find(b => b.budgetId === id);
    setCurrentBudget(budget)
  };
  return (
    <div className="w-full">
      <Link className="btn" to={'compose'}>
        <Pencil /> Add Budget
      </Link>
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
