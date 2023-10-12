import React from "react";
import { Card } from "../../../Components/ui/card";
import EditDeleteButtons from "../../../Components/EditDeleteButtons";

interface GoalsDisplayProps {
  goal: PartialGoalsTypes;
  handleTaskClick: (taskId: string) => void;
  currentGoal: GoalsTypes | null | undefined;
}

const GoalsDisplay = ({
  goal,
  handleTaskClick,
  currentGoal,
}: GoalsDisplayProps) => {
  const editGoal = () => {

  }
  const deleteGoal = () => {}
  return (
    <Card
      onClick={() => {
        handleTaskClick(goal.wGoalId || "");
      }}
      className="my-2 p-2 bg-gray-100"
    >
      <div className="flex  w-full justify-between">
        <div className="flex w-full px-1 py-0 left-0 justify-between items-center">
          <p>{goal.goal}</p>
          <p>Priority: {goal.goalPriority}</p>
        </div>
        <EditDeleteButtons deleteHandler={deleteGoal} editHandler={editGoal} />
      </div>
      {currentGoal && goal.wGoalId === currentGoal.wGoalId && (
        <Card className="rounded-none">
          <div>
            <div className="flex justify-between px-2">
              <p className="text-sm">
                {
                  new Date(currentGoal.weekStart || "")
                    .toISOString()
                    .split("T")[0]
                }{" "}
                to{" "}
                {
                  new Date(currentGoal.weekEnd || "")
                    .toISOString()
                    .split("T")[0]
                }
              </p>
              <p className="text-sm">{currentGoal.privacy}</p>
            </div>
            <div>
              <p>Urgency: {currentGoal.urgency}</p>
              <p>Importance: {currentGoal.importance}</p>
            </div>
          </div>
        </Card>
      )}
    </Card>
  );
};

export default GoalsDisplay;
