import { NextFunction, Request, Response, response } from "express";
import { deleteMonthlyGoalsById, deleteTasksById, deleteWeeklyGoalsById, getAllMonthlyGoalsHandler, getAllTasksHandler, getAllWeeklyGoalsHandler, getMonthlyGoalByIdHandler, getTaskByIdHandler, getWeeklyGoalByIdHandler, postMonthlyGoalItemHanlder, postTaskItemHanlder, postWeekGoalItemHanlder, updateMonthlyGoalsHandler, updateTasksHandler, updateWeeklyGoalsHandler } from "./handler";


export const getWeeklyGoalItemController = async(
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = JSON.parse(req.headers.user as string);
    const data = await getAllWeeklyGoalsHandler(user.userId)
    res.json(data);
  } catch (error) {
    next(error);
  }
};

export const getWeeklyGoalItemByIdController = async(
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = JSON.parse(req.headers.user as string);
    const wGoalId = req.params["wGoalId"];
    const data = await getWeeklyGoalByIdHandler(wGoalId, user.userId)
    res.json(data[0])
  } catch (error) {
    next(error);
  }
};

export const postWeeklyGoalItemController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = req.body.data;
    const userId = req.body.user.userId;
    const data = await postWeekGoalItemHanlder(body, userId);

    res.json(data);
  } catch (error) {
    next(error);
  }
};

export const updateWeeklyGoalItemController = async(
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = req.body.data;
    const user = req.body.user;
    const result = await updateWeeklyGoalsHandler(data, user.userId);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const deleteWeeklyGoalItemController = async(
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = req.body.data;
    const user = req.body.user;
    const result = await deleteWeeklyGoalsById(data, user.userId);
    res.json(result);
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
    const mGoalId = req.params["mGoalId"];
    const result = await getMonthlyGoalByIdHandler(mGoalId, user.userId);
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

export const getTaskItemController = async(
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = JSON.parse(req.headers.user as string);
    const data = await getAllTasksHandler(user.userId);
    res.json(data);
  } catch (error) {
    next(error);
  }
};
export const getTaskItemByIdController = async(
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = JSON.parse(req.headers.user as string);
    const mGoalId = req.params["mGoalId"];
    const result = await getTaskByIdHandler(mGoalId, user.userId);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const postTaskItemController =async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = req.body.data;
    const userId = req.body.user.userId;
    const query = await postTaskItemHanlder(body, userId);

    res.json(query);
  } catch (error) {
    next(error);
  }
};

export const updateTaskItemController = async(
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = req.body.data;
    const user = req.body.user;

    const result = await updateTasksHandler(data, user.userId);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const deleteTaskItemController = async(
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = req.body.data;
    const user = req.body.user;
    const result = await deleteTasksById(data, user.userId);
    res.json(result);
    
  } catch (error) {
    next(error);
  }
};
