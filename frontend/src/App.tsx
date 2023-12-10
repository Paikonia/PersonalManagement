import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthContextProvider } from "./Contexts/authContext";
import { NavContextProvider } from "./Contexts/sidebarContext";
import { ProjectContextProvider } from "./Contexts/useProjects";
import { GoalsContextProvider } from "./Contexts/useGoals";
import { NotesContextProvider } from "./Contexts/useNotes";
import Login from "./Screens/Login";
import Verify from "./Screens/Verify";
import Signup from "./Screens/Signup";
import Mainlayout from "./Layout/Mainlayout";
import Home from "./Screens/Home";
import NotesPage from "./Notes/Page";
import MarkdownEditor from "./Notes/components/MarkDownEditor";
import BudgetPage from "./Budget/Page";
import ComposeBudget from "./Budget/components/ComposeBudgetComponent";
import ExpensePage from "./Expense/Page";
import ComposeExpense from "./Expense/components/ComposeExpense";
import ProjectLayout from "./Projects/ProjectLayout";

const App = () => {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <NavContextProvider>
          <ProjectContextProvider>
            <GoalsContextProvider>
              <NotesContextProvider>
                <Routes>
                  <Route path="/" element={<Mainlayout />}>
                    <Route index element={<Home />} />
                    <Route path="notes" element={<NotesPage />} />
                    <Route path="notes/compose" element={<MarkdownEditor />} />
                    <Route path="budget" element={<BudgetPage />} />
                    <Route path="budget/compose" element={<ComposeBudget />} />
                    <Route path="expense" element={<ExpensePage />} />
                    <Route path="expense/compose" element={<ComposeExpense />} />
                    <Route path="projects" element={<ProjectLayout /> }>
                      <Route index  element={<h1>Projects</h1>} />
                      <Route path="goals" element={<h1>Goals</h1>} />
                      <Route path="tasks" element={<h1>tasks</h1>} />
                    </Route>
                  </Route>
                  <Route path="/auth">
                    <Route path="signin" element={<Login />} />
                    <Route path="verify" element={<Verify />} />
                    <Route path="signup" element={<Signup />} />
                  </Route>
                </Routes>
              </NotesContextProvider>
            </GoalsContextProvider>
          </ProjectContextProvider>
        </NavContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  );
};

export default App;
