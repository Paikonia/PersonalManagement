import React from 'react'

interface TaskDisplayProps {
  progress: string;
  taskId: string;
  handleTaskClick: (id: string) => void;
  currentTask: any;
}

const TaskDisplay = ({progress, taskId, handleTaskClick, currentTask}:TaskDisplayProps) => {
  return (
    <div>TaskDisplay</div>
  )
}

export default TaskDisplay