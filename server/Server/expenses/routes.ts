import { Router } from "express";
import {
  deleteExpenseItemController,
  getExpenseItemByIdController,
  getExpenseItemController,
  postExpenseItemController,
  updateExpenseItemController,
} from "./controller";

const expenseRoutes = Router();

expenseRoutes.get("/", getExpenseItemController);

expenseRoutes.get("/:expenseId", getExpenseItemByIdController);

expenseRoutes.post("/", postExpenseItemController);

expenseRoutes.patch("/", updateExpenseItemController);

expenseRoutes.delete("/", deleteExpenseItemController);

export default expenseRoutes;
