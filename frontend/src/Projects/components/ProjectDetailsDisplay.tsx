import { Card } from '../../Components/ui/card';
import React from 'react'

interface ProjectDetailsDisplayProps {
    project:any
}

const ProjectDetailsDisplay = ({project}:ProjectDetailsDisplayProps) => {
  return (
    <Card className="p-2">
      <div className="flex mb-1 justify-between">
        <p>Duration: {project.estimatedDuration}</p>
        <p>Priority: {project.goalPriority}</p>
      </div>
      <p>Estimated Period Per date: {project.estimatePeriodPerDay}</p>
    </Card>
  );
}

export default ProjectDetailsDisplay