import React, { useEffect, useState } from "react";
import { BudgetType } from "./dataTypesAndUtilities";
import useFetch from "../utils/fetch";
import { useNavigate, useLocation } from "react-router-dom";
import BudgetEditor from "./components/BudgetEditor";
import { Button } from "../Components/ui/button";

const EditBudget = () => {
  const [editedBudget, setEditedBudget] = useState<{
    [key: string]: Partial<BudgetType>;
  }>();
  const fetch = useFetch();
  const { state } = useLocation();
  const handleChange = (id: string, e: any) => {
    const { name, type, checked, value } = e.target;
    if (type === "checkbox") {
      setEditedBudget((prev) => {
        if (prev)
          return {
            ...prev,
            [id]: { ...prev[id], [name]: checked ? 1 : 0 },
          };
      });
    } else {
      setEditedBudget((prev) => {
        if (prev) return { ...prev, [id]: { ...prev[id], [name]: value } };
      });
    }
  };
  useEffect(() => {
    const getBudget = async () => {
      const main = await fetch(`/budget/${state[0]}`);
      setEditedBudget((prev) => {
        return { ...prev, [main.budgetId]: main };
      });
    };
    getBudget();
  }, [state]);

  const navigate = useNavigate()

  const submitChange = async () => {
    await fetch("/budget", {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(editedBudget),
    });
    navigate('/budget')
  };

  return (
    <>
      {editedBudget &&
        Object.keys(editedBudget).map((budgetId: string) => {
          return (
            <BudgetEditor
              handleChange={handleChange}
              id={budgetId}
              newBudget={editedBudget[budgetId]}
            />
          );
        })}
      <Button className="w-full" onClick={submitChange}>
        Submit
      </Button>
    </>
  );
};

export default EditBudget;
