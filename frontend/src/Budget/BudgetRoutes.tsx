import React from 'react'
import { Route, Routes } from 'react-router-dom'
import EditBudget from './EditBudget';
import BudgetPage from './Page';

const BudgetRoutes = () => {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<BudgetPage />} />
        <Route path="edit/" element={<EditBudget />} />
      </Route>
    </Routes>
  );
}

export default BudgetRoutes