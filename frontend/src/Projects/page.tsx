import React, { useEffect, useState } from "react";
import NoProjectsCurrently from "./NoProjectsCurrently";
import useFetch from "../utils/fetch";
import DisplayProjects from "./DisplayProjects";
import NewProject from "./components/NewProject";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [addEdit, setAddEdit] = useState<{ edit: "edit" | "add" | null }>({
    edit: null,
  });

  const changeToAdd = () => {
    setAddEdit({ edit: "add" });
  };
  const changeToDisplay = async () => {
    const data = await fetch("/goal/month");
    setProjects(data);
    setAddEdit({ edit: null });
  };
  const fetch = useFetch();
  useEffect(() => {
    const getNotes = async () => {
      const data = await fetch("/goal/month");
     
      setProjects(data);
    };
    getNotes();
  }, []);
  
  return (
    <div>
      {addEdit.edit === null ? (
        <div>
          {projects.length <= 0 ? (
            <NoProjectsCurrently changeToAdd={changeToAdd} />
          ) : (
            <DisplayProjects changeToAdd={changeToAdd} projects={projects} />
          )}
        </div>
      ) : (
        addEdit.edit === "add" && (
          <div>
            <NewProject changeToDisplay={changeToDisplay} />
          </div>
        )
      )}
    </div>
  );
};

export default Projects;
