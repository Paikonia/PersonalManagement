import { useState } from "react";
import { ExpenseType, PartialExpenseType } from "./dataTypesAndUtilities";
import useFetch from "../utils/fetch";
import { Card } from "../Components/ui/card";
import { Button } from "../Components/ui/button";
import { Pencil } from "lucide-react";
import ExpenseDisplayCard from "./components/ExpenseDisplayCard";

const DisplayExpense = ({
  expenses,
  changeToAdd,
}: {
  expenses: PartialExpenseType[];
  changeToAdd: () => void;
}) => {
  const [currentExpense, setExpense] = useState<ExpenseType>();
  const fetch = useFetch();
  const handleNoteClick = async (id: string) => {
    const specificNote = await fetch(`/expense/${id}`);
    setExpense(specificNote);
  };
  return (
    <div className="w-full">
      <Button onClick={changeToAdd}>
        <Pencil /> Add Expense
      </Button>
      <div className={`my-2`}>
        <Card className={`mx-1 p-4 w-full border-2`}>
          {expenses.map((expense: PartialExpenseType) => (
            <ExpenseDisplayCard
              expense={expense}
              handleClick={handleNoteClick}
              currentExpense={currentExpense}
            />
          ))}
        </Card>
      </div>
    </div>
  );
};

export default DisplayExpense;
