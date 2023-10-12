import { Button } from "../../../Components/ui/button";
import EditDeleteButtons from "../../../Components/EditDeleteButtons";
import { Card } from "../../../Components/ui/card";
import { useNavigate } from "react-router-dom";

interface ProjectDisplayProps {
  complete: boolean;
  goal: string;
  estimateDuration: string;
  goalPriority: string;
  projectId: string;
  handleProjectClick: (id: string) => void;
  currentProject: any;
}

const ProjectDisplay = ({
  projectId,
  complete,
  goal,
  goalPriority,
  estimateDuration,
  handleProjectClick,
  currentProject,
}: ProjectDisplayProps) => {
  const handleDeleteProject = () => {};
  const handleEditProject = () => {};
  const navigate = useNavigate();
  const seeDetails = () => {
    console.log({projectId, currentProject})
    navigate("/projects/projects/details", {

      state: { projectId, project: currentProject },
    });
  };

  return (
    <Card
      onClick={() => {
        handleProjectClick(projectId);
      }}
      className="border-2 hover:bg-slate-200 mb-3 overflow-hidden rounded-xl p-2"
    >
      <div className="flex mb-1 justify-between">
        <div className="flex w-10/12 sm:w-10/12 md:w-11/12 xl:w-5/6 px-1 py-0 left-0 justify-start items-center">
          <input
            type="checkbox"
            className="mx-1"
            name={String(projectId)}
            id={String(projectId)}
          />
          <p className="ml-2 w-30  sm:w-42 max-w-xs mr-2 truncate">{goal}</p>
          <h3 className="mr-2 w-20">{estimateDuration}</h3>
          <p>{goalPriority}</p>
        </div>
        <EditDeleteButtons
          deleteHandler={handleDeleteProject}
          editHandler={handleEditProject}
        />
      </div>
      {currentProject && currentProject.mGoalId === projectId && (
        <Card>
          <div>
            <p>Duration: {currentProject.estimatedDuration}</p>
            <p>Priority: {currentProject.goalPriority}</p>
          </div>
          <div>
            <p>Category: {currentProject.goalCategory}</p>
            <p>
              Start Date: 
              {new Date(currentProject.monthStart).toISOString().split("T")[0]}
            </p>
          </div>
          <Button onClick={seeDetails}>Details</Button>
        </Card>
      )}
    </Card>
  );
};

export default ProjectDisplay;
