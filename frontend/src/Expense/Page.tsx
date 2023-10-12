import React, { useEffect, useState } from "react";
import useFetch from "../utils/fetch";
import NoExpenseCurrently from "./NoExpenseCurrently";
import DisplayExpense from "./DisplayExpense";
import NewExpenseCard from "./components/NewExpenseCard";

export interface NoteType {
  noteId: number;
  title: string;
  note: string | null;
  dateCreated: Date | null;
  media: any;
  notePrivacy: "private" | "public";
  creator: string;
}

const Expense = () => {
  const [expenses, setExpenses] = useState<PartialExpenseType[]>([]);
  const [addEdit, setAddEdit] = useState<{ edit: "edit" | "add" | null }>({
    edit: null,
  });

  const changeToAdd = () => {
    setAddEdit({ edit: "add" });
  };
  const changeToDisplay =async () => {
    const data = await fetch("/expense");
    setExpenses(data);
    setAddEdit({ edit: null });
  };
  const fetch = useFetch();
  useEffect(() => {
    const getNotes = async () => {
      const data = await fetch("/expense");
      setExpenses(data);
    };
    getNotes();
  }, []);
  console.log("Expenses: ", expenses);
  return (
    <div>
      {addEdit.edit === null ? (
        <div>
          {expenses.length <= 0 ? (
            <NoExpenseCurrently changeToAdd={changeToAdd} />
          ) : (
            <DisplayExpense changeToAdd={changeToAdd} expenses={expenses} />
          )}
        </div>
      ) : (
        addEdit.edit === "add" && (
          <NewExpenseCard changeToDisplay={changeToDisplay} />
        )
      )}
    </div>
  );
};

export default Expense;
