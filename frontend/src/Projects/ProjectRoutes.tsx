import React from "react";
import { Route, Routes } from "react-router-dom";
import Projects from "./page";
import DisplayProjects from "./Projects/DisplayProjects";
import NewProject from "./Projects/components/NewProject";
import ProjectDetailsDisplay from "./Projects/components/ProjectDetailsDisplay";
import DisplayTasks from "./Tasks/DisplayTasks";
import NewTask from "./Tasks/Componets/NewTask";
import TasksDetailsDisplay from "./Tasks/Componets/TasksDetailsDisplay";
import DisplayGoals from "./Goals/DisplayGoals";
import NewGoals from "./Goals/Components/NewGoals";
import GoalsDetailsDisplay from "./Goals/Components/GoalsDetailsDisplay";

const ProjectRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Projects />}>
        <Route path="/projects" element={<DisplayProjects />} />
        <Route path="/projects/compose/" element={<NewProject />} />
        <Route path="/projects/details/" element={<ProjectDetailsDisplay />} />
        <Route path="/goals" element={<DisplayGoals />} />
        <Route path="/goals/compose/" element={<NewGoals />} />
        <Route path="/goals/details/" element={<GoalsDetailsDisplay />} />
        <Route path="/tasks" element={<DisplayTasks />} />
        <Route path="/tasks/compose/" element={<NewTask />} />
        <Route path="tasks/details/" element={<TasksDetailsDisplay />} />
      </Route>
    </Routes>
  );
};

export default ProjectRoutes;
