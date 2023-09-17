import express, {Request, Errback, Response, NextFunction} from "express";
import cors from "cors";
import goalRoutes from "./Server/tasks/routes";
import budgetRoutes from "./Server/budget/routes";
import expenseRoutes from "./Server/expenses/routes";
import notesRoutes from "./Server/notes/routes";
import dot from "dotenv";
import authRoute from "./Server/Auth/routes";
dot.config();
import {getUserDataMiddleWare} from './Server/Auth/authorisation'


const app = express();

app.use(cors())
app.use(express.json());



app.use("/auth", authRoute);

app.use(getUserDataMiddleWare)

app.use("/goal", goalRoutes);
app.use("/budget",  budgetRoutes);
app.use("/expense", expenseRoutes);
app.use("/notes", notesRoutes);

app.use((error:any, req:Request, res:Response, next:NextFunction) => {
  console.error(error.stack)
  res.status(500).json({
    error: error.message
  })
})

export default app;
