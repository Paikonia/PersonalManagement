import { useEffect, useState } from "react";
import useFetch from "../utils/fetch";
import NoExpenseCurrently from "./NoExpenseCurrently";
import DisplayExpense from "./DisplayExpense";

const ExpensePage = () => {
  const [expenses, setExpenses] = useState<ExpenseType[]>([]);
  const [loadingExpenses, setLoadingExpenses] = useState<boolean>(false);
  const fetch = useFetch();
  useEffect(() => {
    const getNotes = async () => {
      setLoadingExpenses(true);
      try {
        const data = (await fetch("/expense")) as ExpenseType[];
        setExpenses(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingExpenses(false);
      }
    };
    getNotes();
  }, []);
  if (loadingExpenses) {
    return <h1>Loading expenses. Please wait</h1>;
  }
  return (
    <div>
      <div>
        {expenses.length <= 0 ? (
          <NoExpenseCurrently />
        ) : (
          <DisplayExpense expenses={expenses} />
        )}
      </div>
    </div>
  );
};

export default ExpensePage;
