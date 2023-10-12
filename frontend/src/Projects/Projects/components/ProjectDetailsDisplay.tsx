import useFetch from "../../../utils/fetch";
import { Card } from "../../../Components/ui/card";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

// interface ProjectDetailsDisplayProps {

// }

const ProjectDetailsDisplay = () => {
  const fetch = useFetch();
  const { state } = useLocation();
  const project = state.project;
  const [weeklyGoals, setWeeklyGoals] = useState<any>();

  useEffect(() => {
    const getProject = async () => {
      const proj = await fetch(`/goal/week/project/${state.projectId}`);
      console.log({ proj });
      setWeeklyGoals(proj);
    };
    getProject();
  }, []);
  return (
    <Card className="p-2">
      <div>
        <div className="flex mb-1 justify-between">
          <p className="mb-2 text-2xl">{project.goal}</p>
          <p className="text-gray-500 text-sm">
            Start: {new Date(project.monthStart).toISOString().split("T")[0]}
          </p>
        </div>
        <div className="flex mb-1 justify-between">
          <p>Duration: {project?.estimatedDuration}</p>
          <p>Priority: {project?.goalPriority}</p>
        </div>
        <div className="flex mb-1 justify-between">
          <p>Mins per day: {project?.estimatePeriodPerDay}</p>
          <p>Category: {project.goalCategory}</p>
        </div>
      </div>
      <Card>
        <div className="flex mb-1 justify-between items-center p-1">
          <h1>Weekly Goals</h1>
        </div>
        <div>
          {weeklyGoals &&
            weeklyGoals.map((goal: Partial<GoalsTypes>) => (
              <div className="px-1 mb-2 border-2">
                <div className="flex justify-between">
                  <p>{goal.goal}</p>
                  complete: {goal.completed ? "Complete" : "Pending"}
                </div>
                <div className="flex justify-between">
                  <p>
                    From:{" "}
                    {new Date(goal.weekStart || "").toISOString().split("T")[0]}
                  </p>
                  <p>
                    To:{" "}
                    {new Date(goal.weekEnd || "").toISOString().split("T")[0]}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </Card>
    </Card>
  );
};

export default ProjectDetailsDisplay;
