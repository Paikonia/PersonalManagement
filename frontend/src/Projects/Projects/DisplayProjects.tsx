import { Card } from "../../Components/ui/card";
import { Button } from "../../Components/ui/button";
import { Pencil } from "lucide-react";
import ProjectDisplay from "./components/ProjectDisplay";
import { useNavigate } from "react-router-dom";
import NoProjectsCurrently from "./NoProjectsCurrently";
import { useProjects } from "../../Contexts/useProjects";

const DisplayProjects = () => {
  const {projects, project, getProject} = useProjects()
  const handleProjectClick = async (id: string) => {
    getProject(id);
  };
  const navigate = useNavigate()
  const changeToAdd = () => {
    navigate('/projects/projects/compose')
  }

  return (
    <>
      {projects && projects.length > 0 && (
        <div className="w-full">
          <Button className="w-full" onClick={changeToAdd}>
            <Pencil /> Add Project
          </Button>
          <div className={`my-2`}>
            <Card className="mx-1 p-4  w-full">
              {projects.map((proj: any) => (
                <ProjectDisplay
                  handleProjectClick={handleProjectClick}
                  goal={proj.goal}
                  projectId={proj.mGoalId}
                  goalPriority={proj.goalPriority}
                  estimateDuration={proj.estimatedDuration}
                  complete={proj.complete === 0}
                  currentProject={project}
                />
              ))}
            </Card>
          </div>
        </div>
      )}
      {(!projects || projects.length <= 0) &&  <NoProjectsCurrently changeToAdd={changeToAdd} />}
    </>
  );
};

export default DisplayProjects;
