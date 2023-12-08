import { createContext, useContext, useEffect, useState } from "react";
import useFetch from "../utils/fetch";

interface GoalsContextProps {
  goals: GoalsTypes[];
  goal: GoalsTypes | null;
  getGoal: (projectId: string) => void;
  refreshGoals: () => void;
}

const GoalContext = createContext<GoalsContextProps>({
  goals: [],
  goal: null,
  getGoal: (projectId: string) => {},
  refreshGoals: () => {},
});

export const GoalsContextProvider = ({ children }: { children: any }) => {
  const [goals, setGoals] = useState<GoalsTypes[]>([]);
  const [goal, setGoal] = useState<GoalsTypes | null>(null);
  const fetch = useFetch();
  useEffect(() => {
    const getNotes = async () => {
      const goals = await fetch("/goal/week");
      setGoals(goals);
    };
    getNotes();
  }, []);

  const refreshGoals = async () => {
    const goals = await fetch("/goal/week");
    console.log({goals})
    setGoals(goals);
  };

  const getGoal = (projectId: string): void => {
    if (goals.length > 0) {
      setGoal(goals.find((project) => project.wGoalId === projectId) || null);
    }
  };

  return (
    <GoalContext.Provider
      value={{
        goal,
        goals,
        refreshGoals,
        getGoal,
      }}
    >
      {children}
    </GoalContext.Provider>
  );
};

export const useGoals = () => useContext(GoalContext);
