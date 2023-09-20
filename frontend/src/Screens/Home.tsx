import React from "react";
import ExpenseDisplay from "../Components/ExpenseDisplay";
import BudgetDisplay from "../Components/BudgetDisplay";
import NotesDisplay from "../Notes/components/NotesDisplay";

const Home = () => {
  return (
    <div>
      <ExpenseDisplay
        expense="Expense example lahsjkhkd klajskldjl"
        method="Cash"
        date={new Date(Date.now()).toISOString()}
        id="Hello"
      />

      <BudgetDisplay
        paid={false}
        budgetId="BU20230200001"
        expenseCategeory="Academics"
        budget="Books for Akello"
        amount={200000}
      />
      <NotesDisplay dateCreated={new Date(Date.now())} title="First note"  noteId={2}  />
    </div>
  );
};

export default Home;
