import { useEffect, useState } from "react";
import useFetch from "../utils/fetch";
import NoBudgetCurrently from "./NoBudgetCurrently";
import DisplayBudget from "./DisplayBudget";

export interface NoteType {
  noteId: number;
  title: string;
  note: string | null;
  dateCreated: Date | null;
  media: object[];
  notePrivacy: "private" | "public";
  creator: string;
}

const BudgetPage = () => {
  const [budgets, setBudgets] = useState<BudgetType[]>([]);
  const [budgetsLoading, setBudgetsLoading] = useState<boolean>(false)
  const fetch = useFetch();
  useEffect(() => {
    const getBudgets = async () => {
      setBudgetsLoading(true)
      const data = (await fetch("/budget")) as BudgetType[];
      setBudgets(data);
      setBudgetsLoading(false);
    };
    getBudgets();
  }, []);

  if(budgetsLoading){
    return <h1>Budget is currently loading</h1>
  }

  return (
    <div>
      { (
        <div>
          {budgets.length <= 0 ? (
            <NoBudgetCurrently />
          ) : (
            <DisplayBudget budgets={budgets} />
          )}
        </div>
      ) }
    </div>
  );
};

export default BudgetPage;
