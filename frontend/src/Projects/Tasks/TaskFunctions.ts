export interface PartialTaskType {
  tasksId: number;
  task: string;
  progress: "In progress" | "Completed" | "Not Started";
}
export interface TaskType extends PartialTaskType {
    taskDate:string;
    startingTime:string;
    estimatedDuration:number;
    goalId:string;
    privacy: 'private'| 'public';
}