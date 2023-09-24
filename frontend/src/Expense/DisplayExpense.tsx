import React, { useState } from "react";
import { ExpenseType, PartialExpenseType } from "./dataTypesAndUtilities";
import useFetch from "../utils/fetch";
import { Card } from "../Components/ui/card";
import { Button } from "../Components/ui/button";
import { Pencil } from 'lucide-react'
import ExpenseDisplayCard from "./components/ExpenseDisplayCard";
import ExpenseDetailsDisplay from "./components/ExpenseDetailsDisplayCard";


const DisplayExpense = ({
  expenses,
  changeToAdd,
}: {
  expenses: PartialExpenseType[];
  changeToAdd: ()=> void;
}) => {
  const [expense, setExpense] = useState<ExpenseType>();
  const fetch = useFetch();
  const handleNoteClick = async (id: string) => {
    const specificNote = await fetch(`/expense/${id}`);
    setExpense(specificNote);
  };
  return (
    <div className="w-full">
      <Button onClick={changeToAdd}>
        <Pencil /> Add Note
      </Button>
      <div className="w-full flex my-2">
        <Card
          className={`mx-1 p-4 ${expense ? "md:w-7/12 xl:w-5/12" : "w-full"} `}
        >
          {expenses.map((expense: PartialExpenseType) => (
            <ExpenseDisplayCard
              expense={expense}
              handleClick={handleNoteClick}
            />
          ))}
        </Card>
        <>{expense && <ExpenseDetailsDisplay expense={expense} />}</>
      </div>
    </div>
  );
};

export default DisplayExpense;
