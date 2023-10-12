import React, { useEffect, useState } from "react";
import useFetch from "../utils/fetch";
import NoExpenseCurrently from "./NoBudgetCurrently";
import NewBudgetCard from "./components/NewBudgetCard";
import DisplayBudget from "./DisplayBudget";

export interface NoteType {
  noteId: number;
  title: string;
  note: string | null;
  dateCreated: Date | null;
  media: any;
  notePrivacy: "private" | "public";
  creator: string;
}

const BudgetPage = () => {
  const [budgets, setBudgets] = useState<PartialBudgetType[]>([]);
  const [addEdit, setAddEdit] = useState<{ edit: "edit" | "add" | null }>({
    edit: null,
  });

  const changeToAdd = () => {
    setAddEdit({ edit: "add" });
  };
  const changeToDisplay =async () => {
    const data = await fetch("/budget");
    setBudgets(data);
    setAddEdit({ edit: null });
  };
  const fetch = useFetch();
  useEffect(() => {
    const getBudgets = async () => {
      const data = await fetch("/budget");
      setBudgets(data);
    };
    getBudgets();
  }, []);
  return (
    <div>
      {addEdit.edit === null ? (
        <div>
          {budgets.length <= 0 ? (
            <NoExpenseCurrently changeToAdd={changeToAdd} />
          ) : (
            <DisplayBudget changeToAdd={changeToAdd} budgets={budgets} />
          )}
        </div>
      ) : (
        addEdit.edit === "add" && (
          <NewBudgetCard changeToDisplay={changeToDisplay} />
        )
      )}
    </div>
  );
};

export default BudgetPage;
