import { NextFunction, Request, Response, response } from "express";
import { deleteMonthlyGoalsById, getAllMonthlyGoalsHandler, getMonthlyGoalByIdHandler, postMonthlyGoalItemHanlder, updateMonthlyGoalsHandler } from "./handler";


export const getWeeklyGoalItemController = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.send("Get Weekly Goal Item");
  } catch (error) {
    next(error);
  }
};

export const postWeeklyGoalItemController = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.send("Post Weekly Goal Item");
  } catch (error) {
    next(error);
  }
};

export const updateWeeklyGoalItemController = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.send("update Weekly Goal Item");
  } catch (error) {
    next(error);
  }
};

export const deleteWeeklyGoalItemController = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.send("Delete Weekly Goal Item");
  } catch (error) {
    next(error);
  }
};

export const getMonthlyGoalItemController = async(
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = JSON.parse(req.headers.user as string);
    const goals = await getAllMonthlyGoalsHandler(user.userId)
    res.json(goals);
  } catch (error) {
    next(error);
  }
};

export const getMonthlyGoalItemByIdController = async(
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = JSON.parse(req.headers.user as string);
    console.log(user);
    const budgetId = req.params["mGoalId"];
    const result = await getMonthlyGoalByIdHandler(budgetId, user.userId)
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const postMonthlyGoalItemController = async(
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = req.body.data;
    const userId = req.body.user.userId
    const query = await postMonthlyGoalItemHanlder(body, userId);
    
    res.json(query);

  } catch (error) {
    next(error);
  }
};

export const updateMonthlyGoalItemController = async(
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = req.body.data
    const user = req.body.user
    
    const result = await updateMonthlyGoalsHandler(data, user.userId)
    res.json(result)
  } catch (error) {
    next(error);
  }
};

export const deleteMonthlyGoalItemController =async  (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = req.body.data
    const user = req.body.user
    const result = await deleteMonthlyGoalsById(data, user.userId)
    res.json(result)
  } catch (error) {
    next(error);
  }
};

export const getTaskItemController = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.send("Get task Item");
  } catch (error) {
    next(error);
  }
};

export const postTaskItemController = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.send("Post task Item");
  } catch (error) {
    next(error);
  }
};

export const updateTaskItemController = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.send("update task Item");
  } catch (error) {
    next(error);
  }
};

export const deleteTaskItemController = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.send("Delete task Item");
  } catch (error) {
    next(error);
  }
};
