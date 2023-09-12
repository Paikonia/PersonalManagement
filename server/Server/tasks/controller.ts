import { NextFunction, Request, Response, response } from "express";
import { postMonthlyGoalItemHanlder } from "./handler";
import {
  verifyBodyForPostMonthly,
  verifyMonthlyGoalsType,
} from "./typeCheckers";

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

export const getMonthlyGoalItemController = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.send("Get Monthly Goal Item");
  } catch (error) {
    next(error);
  }
};

export const postMonthlyGoalItemController = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = req.body.data;
    const data = verifyBodyForPostMonthly(body);
    if (data.success.length > 0) {
      const query = postMonthlyGoalItemHanlder(data.success);
      console.log(query);
      //res.send({ query });
    }
    res.json(data)

    const returnedData = {success: 'Partial', erroredInputs: data.failed, } 
  } catch (error) {
    next(error);
  }
};

export const updateMonthlyGoalItemController = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.send("update Monthly Goal Item");
  } catch (error) {
    next(error);
  }
};

export const deleteMonthlyGoalItemController = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.send("Delete Monthly Goal Item");
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
