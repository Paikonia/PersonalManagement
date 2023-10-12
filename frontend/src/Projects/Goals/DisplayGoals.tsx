import NoGoalsToDisplay from './NoGoalsToDisplay';
import { Card } from '../../Components/ui/card';
import { Pencil } from 'lucide-react';
import { Button } from '../../Components/ui/button';
import { useNavigate } from 'react-router-dom';
import GoalsDisplay from './Components/GoalsDisplay';
import { useGoals } from '../../Contexts/useGoals';

const DisplayGoals = () => {

   const {goals, getGoal, goal} = useGoals()

    const handleProjectClick = async (id: string) => {
      getGoal(id);
    };
    const navigate = useNavigate();
    const changeToAdd = () => {
      navigate("/projects/goals/compose");
    };


  return (
    <>
      {goals && goals.length > 0 && (
        <div className="w-full">
          <Button className="w-full" onClick={changeToAdd}>
            <Pencil /> Add Project
          </Button>
          <div className={`my-2`}>
            <Card className="mx-1 p-4  w-full">
              {goals.map((proj: PartialGoalsTypes) => (
                <GoalsDisplay
                  handleTaskClick={handleProjectClick}
                  goal={proj}
                  currentGoal={goal}
                />
              ))}
            </Card>
          </div>
        </div>
      )}
      {(!goals || goals.length <= 0) && (
        <NoGoalsToDisplay changeToAdd={changeToAdd} />
      )}
    </>
  );
}

export default DisplayGoals