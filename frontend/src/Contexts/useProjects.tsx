import React, { useContext, createContext, useState, useEffect } from "react";
import useFetch from "../utils/fetch";

interface ProjectsContextProps {
  projects: ProjectTypes[];
  project: ProjectTypes | null;
  tasks: TaskType[];
  getProject: (projectId: string) => void;
  refreshProjects: () => void;
}


const ProjectContext = createContext<ProjectsContextProps>({
  projects: [],
  project: null,
  tasks: [],
  getProject: (id: string) => {},
  refreshProjects: () => {},
});

export const ProjectContextProvider = ({ children }: { children: any }) => {
    const [projects, setProjects] = useState<ProjectTypes[]>([])
    const [project, setProject] = useState<ProjectTypes| null>(null)
    const [tasks, setTasks] = useState<TaskType[]>([])
    const fetch = useFetch()
    useEffect(() => {
      const getNotes = async () => {
        const projects = await fetch("/goal/month");
        setProjects(projects);
      };
      getNotes();
    }, []);

    const refreshProjects =async  () => {
      const projects = await fetch("/goal/month");
      setProjects(projects);
    }

    const getProject= (projectId:string): void => {
      if(projects.length > 0) {
        setProject(projects.find(project => project.mGoalId === projectId) || null)
      }
    }



    return (
      <ProjectContext.Provider
        value={{
          projects,
          tasks,
          getProject,
          project,
          refreshProjects,
        }}
      >
        {children}
      </ProjectContext.Provider>
    );
};

export const useProjects = () => useContext(ProjectContext);
