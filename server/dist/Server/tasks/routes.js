"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = require("./controller");
const goalRoutes = (0, express_1.Router)();
goalRoutes.get('/tasks', controller_1.getTaskItemController);
goalRoutes.get('/tasks/:taskId', controller_1.getTaskItemByIdController);
goalRoutes.post("/tasks", controller_1.postTaskItemController);
goalRoutes.patch("/tasks", controller_1.updateTaskItemController);
goalRoutes.delete("/tasks", controller_1.deleteTaskItemController);
goalRoutes.get("/week", controller_1.getWeeklyGoalItemController);
goalRoutes.get("/week/:wGoalId", controller_1.getWeeklyGoalItemByIdController);
goalRoutes.get("/week/project/:mGoalId", controller_1.getWeeklyGoalItemByProjectIdController);
goalRoutes.post("/week", controller_1.postWeeklyGoalItemController);
goalRoutes.patch("/week", controller_1.updateWeeklyGoalItemController);
goalRoutes.delete("/week", controller_1.deleteWeeklyGoalItemController);
goalRoutes.get("/month/:mGoalId", controller_1.getMonthlyGoalItemByIdController);
goalRoutes.get("/month", controller_1.getMonthlyGoalItemController);
goalRoutes.post("/month", controller_1.postMonthlyGoalItemController);
goalRoutes.patch("/month", controller_1.updateMonthlyGoalItemController);
goalRoutes.delete("/month", controller_1.deleteMonthlyGoalItemController);
exports.default = goalRoutes;
