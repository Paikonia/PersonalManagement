import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthContextProvider } from "./Contexts/authContext";
import Login from "./Screens/Login";
import Mainlayout from "./Layout/Mainlayout";
import Home from "./Screens/Home";
import Verify from "./Screens/Verify";
import Signup from "./Screens/Signup";
import { NavContextProvider } from "./Contexts/sidebarContext";
import NotesPage from "./Notes/Page";
import ExpensePage from "./Expense/Page";
import BudgetPage from "./Budget/Page";
import Projects from "./Projects/page";
import EditBudget from "./Budget/EditBudget";
import EditExpense from "./Expense/EditExpense";
import EditNotes from "./Notes/EditNotes";

const App = () => {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <NavContextProvider>
          <Routes>
            <Route path="/" element={<Mainlayout />}>
              <Route index element={<Home />} />
              <Route path="/notes" >
                <Route index element={<NotesPage />} />
                <Route path="edit/" element={<EditNotes />} />
              </Route>
              <Route path="/expense">
                <Route index element={<ExpensePage />} />
                <Route path="edit/" element={<EditExpense />} />
              </Route>
              <Route path="/budget">
                <Route index element={<BudgetPage />} />
                <Route path="edit/" element={<EditBudget />} />
              </Route>
              <Route path="/projects" element={<Projects />} />
            </Route>
            <Route path="/auth/signin" element={<Login />} />
            <Route path="/auth/verify" element={<Verify />} />
            <Route path="/auth/signup" element={<Signup />} />
          </Routes>
        </NavContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  );
};

export default App;
