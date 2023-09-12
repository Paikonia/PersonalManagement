import { Router } from "express";
import {
  deleteBudgetItemController,
  getBudgetItemByIdController,
  getBudgetItemController,
  postBudgetItemController,
  updateBudgetItemController,
} from "./controller";
const budgetRoutes = Router();

budgetRoutes.post("/", postBudgetItemController);

budgetRoutes.patch("/", updateBudgetItemController);

budgetRoutes.delete("/", deleteBudgetItemController);

budgetRoutes.get("/", getBudgetItemController);

budgetRoutes.get("/:id", getBudgetItemByIdController);

export default budgetRoutes;
