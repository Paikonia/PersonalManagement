import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthContextProvider } from "./Contexts/authContext";
import Mainlayout from "./Layout/Mainlayout";
import Home from "./Screens/Home";
import { NavContextProvider } from "./Contexts/sidebarContext";
import ProjectRoutes from "./Projects/ProjectRoutes";
import AuthRoutes from "./Screens/AuthRoutes";
import NotesRoute from "./Notes/NotesRoute";
import ExpenseRoute from "./Expense/ExpenseRoute";
import BudgetRoutes from "./Budget/BudgetRoutes";
import { ProjectContextProvider } from "./Contexts/useProjects";
import { GoalsContextProvider } from "./Contexts/useGoals";

const App = () => {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <NavContextProvider>
          <ProjectContextProvider>
            <GoalsContextProvider>
              <Routes>
                <Route path="/" element={<Mainlayout />}>
                  <Route index element={<Home />} />
                  <Route path="/notes/*" element={<NotesRoute />} />
                  <Route path="/expense/*" element={<ExpenseRoute />} />
                  <Route path="/projects/*" element={<ProjectRoutes />} />
                  <Route path="/budget/*" element={<BudgetRoutes />} />
                </Route>
                <Route path="/auth/*" element={<AuthRoutes />} />
              </Routes>
            </GoalsContextProvider>
          </ProjectContextProvider>
        </NavContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  );
};



export default App