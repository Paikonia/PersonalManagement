import { Router} from 'express'
import { deleteMonthlyGoalItemController, deleteTaskItemController, deleteWeeklyGoalItemController, getMonthlyGoalItemController, getTaskItemController, getWeeklyGoalItemController, postMonthlyGoalItemController, postTaskItemController, postWeeklyGoalItemController, updateMonthlyGoalItemController, updateTaskItemController, updateWeeklyGoalItemController } from './controller';

const goalRoutes = Router()

goalRoutes.get('/tasks', getTaskItemController)

goalRoutes.post("/tasks", postTaskItemController);

goalRoutes.patch("/tasks", updateTaskItemController);

goalRoutes.delete("/tasks", deleteTaskItemController);

goalRoutes.get("/week", getWeeklyGoalItemController);

goalRoutes.post("/week", postWeeklyGoalItemController);

goalRoutes.patch("/week", updateWeeklyGoalItemController);

goalRoutes.delete("/week", deleteWeeklyGoalItemController);

goalRoutes.get("/month", getMonthlyGoalItemController);

goalRoutes.post("/month", postMonthlyGoalItemController);

goalRoutes.patch("/month", updateMonthlyGoalItemController);

goalRoutes.delete("/month", deleteMonthlyGoalItemController);

export default goalRoutes
