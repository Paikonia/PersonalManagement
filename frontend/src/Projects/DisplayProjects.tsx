import React, { useState } from "react";
import useFetch from "../utils/fetch";
import { Card } from "../Components/ui/card";
import { Button } from "../Components/ui/button";
import { Pencil } from "lucide-react";
import ProjectDisplay from "./components/ProjectDisplay";
import ProjectDetailsDisplay from "./components/ProjectDetailsDisplay";
const DisplayProjects = ({
  projects,
  changeToAdd,
}: {
  projects: any;
  changeToAdd: () => void;
}) => {
  const [project, setProjects] = useState<any>();
  const fetch = useFetch();

  const handleProjectClick = async (id: string) => {
    const specificProject = await fetch(`/goal/month/${id}`);
    setProjects(specificProject[0]);
  };
  
  return (
    <div className="w-full">
      <Button disabled onClick={changeToAdd}>
        <Pencil /> Add Project
      </Button>
      <div className={`${project ? "main-displays" : ""} my-2`}>
        <Card className={`mx-1 p-4  "w-full" `}>
          {projects.map((project: any) => (
            <ProjectDisplay
              handleProjectClick={handleProjectClick}
              goal={project.goal}
              projectId={project.mGoalId}
              goalPriority={project.goalPriority}
              estimateDuration={project.estimatedDuration}
              complete={project.complete === 0}
            />
          ))}
        </Card>
        {project && <ProjectDetailsDisplay project={project} />}
      </div>
    </div>
  );
};

export default DisplayProjects;
