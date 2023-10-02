import { Router} from 'express'
import { deleteMonthlyGoalItemController, deleteTaskItemController, deleteWeeklyGoalItemController, getMonthlyGoalItemByIdController, getMonthlyGoalItemController, getTaskItemByIdController, getTaskItemController, getWeeklyGoalItemByIdController, getWeeklyGoalItemController, postMonthlyGoalItemController, postTaskItemController, postWeeklyGoalItemController, updateMonthlyGoalItemController, updateTaskItemController, updateWeeklyGoalItemController } from './controller';

const goalRoutes = Router()

goalRoutes.get('/tasks', getTaskItemController)

goalRoutes.get('/tasks/:taskId', getTaskItemByIdController)

goalRoutes.post("/tasks", postTaskItemController);

goalRoutes.patch("/tasks", updateTaskItemController);

goalRoutes.delete("/tasks", deleteTaskItemController);

goalRoutes.get("/week", getWeeklyGoalItemController);

goalRoutes.get("/week/:wGoalId", getWeeklyGoalItemByIdController);

goalRoutes.post("/week", postWeeklyGoalItemController);

goalRoutes.patch("/week", updateWeeklyGoalItemController);

goalRoutes.delete("/week", deleteWeeklyGoalItemController);

goalRoutes.get("/month/:mGoalId", getMonthlyGoalItemByIdController);
goalRoutes.get("/month", getMonthlyGoalItemController);

goalRoutes.post("/month", postMonthlyGoalItemController);

goalRoutes.patch("/month", updateMonthlyGoalItemController);

goalRoutes.delete("/month", deleteMonthlyGoalItemController);

export default goalRoutes
