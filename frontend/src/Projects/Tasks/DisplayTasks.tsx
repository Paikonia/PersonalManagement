import { Card } from '../../Components/ui/card';
import useFetch from '../../utils/fetch';
import { Pencil } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { Button } from 'react-day-picker';
import { useNavigate } from 'react-router-dom';

import NoTasksToDisplay from './NoTasksToDisplay';
import TaskDisplay from './Componets/TaskDisplay';
import { PartialTaskType, TaskType } from './TaskFunctions';



const DisplayTasks = () => {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [task, setTask] = useState<TaskType>();
  const fetch = useFetch();
  useEffect(() => {
    const getNotes = async () => {
      const data = await fetch("/goal/tasks");
      setTasks(data);
    };
    getNotes();
  }, []);

  const handleProjectClick = async (id: string) => {
    const specificProject = await fetch(`/goal/task/${id}`);
    setTask(specificProject[0]);
  };
  const navigate = useNavigate();
  const changeToAdd = () => {
    navigate("/projects/tasks/compose");
  };
  return (
    <>
      {tasks && tasks.length > 0 && (
        <div className="w-full">
          <Button className="w-full" onClick={changeToAdd}>
            <Pencil /> Add Project
          </Button>
          <div className={`my-2`}>
            <Card className="mx-1 p-4  w-full">
              {tasks.map((proj: PartialTaskType) => (
                <TaskDisplay
                  handleTaskClick={handleProjectClick}
                  progress={proj.progress}
                  taskId={String(proj.tasksId)}
                  currentTask={task}
                />
              ))}
            </Card>
          </div>
        </div>
      )}
      {(!tasks || tasks.length <= 0) && (
        <NoTasksToDisplay changeToAdd={changeToAdd} />
      )}
    </>
  );
}

export default DisplayTasks