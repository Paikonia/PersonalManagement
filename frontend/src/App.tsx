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

const App = () => {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <NavContextProvider>
          <Routes>
            <Route path="/" element={<Mainlayout />}>
              <Route index element={<Home />} />
              <Route path="/notes" element={<NotesPage />} />
              <Route path="/expense" element={<ExpensePage />} />
              <Route path="/budget" element={<BudgetPage />} />
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
