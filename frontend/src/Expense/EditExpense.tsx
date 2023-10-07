import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useFetch from "../utils/fetch";
import { ExpenseType } from "./dataTypesAndUtilities";
import ExpenseEditor from "./components/ExpenseEditor";
import { Button } from "../Components/ui/button";

const EditExpense = () => {
  const [editedExpense, setEditedExpense] = useState<{
    [key: string]: ExpenseType;
  }>();
  const fetch = useFetch();
  const { state } = useLocation();
  useEffect(() => {
    const getter = async () => {
      const expense = await fetch(`/expense/${state[0]}`);
      setEditedExpense((prev) => ({ ...prev, [expense.expenseId]: expense }));
    };
    getter();
  }, []);

  const onChangeHandler = (expenseId: string, e: any) => {
    const { value, name } = e.target;
    
    setEditedExpense((prev) => {
      if (prev) return { ...prev, [expenseId]: { ...prev[expenseId], [name]: value } };
    });
  };

  const navigate = useNavigate();

  const submitChange = async () => {
    await fetch("/expense", {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(editedExpense),
    });
    navigate("/expense");
  };

  return (
    <>
      {editedExpense &&
        Object.keys(editedExpense).map((key) => (
          <ExpenseEditor
            editedExpense={editedExpense[key]}
            onChangeHandler={onChangeHandler}
            expenseId={key}
          />
        ))}
        <Button onClick={submitChange}>Submit Edited</Button>
    </>
  );
};

export default EditExpense;
