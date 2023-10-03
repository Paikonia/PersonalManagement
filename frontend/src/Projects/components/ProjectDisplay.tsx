import EditDeleteButtons from "../../Components/EditDeleteButtons";
import { Card } from "../../Components/ui/card";

interface ProjectDisplayProps {
  complete: boolean;
  goal: string;
  estimateDuration: string;
  goalPriority: string;
  projectId: string;
  handleProjectClick: (id: string) => void;
  
}

const ProjectDisplay = ({
  projectId,
  complete,
  goal,
  goalPriority,
  estimateDuration,
  handleProjectClick,
}: ProjectDisplayProps) => {
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
        <EditDeleteButtons />
      </div>
    </Card>
  );
};

export default ProjectDisplay;
