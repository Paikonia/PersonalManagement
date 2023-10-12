import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ExpensePage from "./Page";
import EditExpense from './EditExpense';


const ExpenseRoute = () => {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<ExpensePage />} />
        <Route path="edit/" element={<EditExpense />} />
      </Route>
    </Routes>
  );
}

export default ExpenseRoute