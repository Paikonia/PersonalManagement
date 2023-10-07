import { NextFunction, Request, Response } from "express";
import {
  deleteBudgetById,
  getAllBudgetHandler,
  getBudgetByIdHandler,
  postBudgetItemsHandler,
  updateBudgetHandler,
} from "./handler";
import { GENERALERRORS } from "../Constants/OtherErrorDefinitions";

export const getBudgetItemController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = JSON.parse(req.headers.user as string);
    const returnedData = await getAllBudgetHandler(user.userId);
    res.json(returnedData);
  } catch (error) {
    next(error);
  }
};

export const getBudgetItemByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = JSON.parse(req.headers.user as string);
    const budgetId = req.params["id"];
    const ret = await getBudgetByIdHandler(budgetId, user.userId);
    res.json(ret);
  } catch (error) {
    next(error);
  }
};

export const postBudgetItemController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.body.user;
    const data = req.body.data;
    const result = await postBudgetItemsHandler(data, user.userId);
    res.json( result );
  } catch (error) {
    next(error);
  }
};

export const updateBudgetItemController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = req.body.data;
    const user = req.body.user;
    console.log(data);
    
    if (!data || !(data instanceof Object) || Array.isArray(data)) {
      const err = GENERALERRORS.MalformedRequest;
      err.message =
        "The request request an object that has the budget ids as keys and and changes in the object";
      throw err;
    }

    const result = await updateBudgetHandler(data, user.userId);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const deleteBudgetItemController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { budgetIds } = req.body.data;
    const { userId } = req.body.user;
    if (!Array.isArray(budgetIds)) {
      const err = GENERALERRORS.MalformedRequest
      err.message ="The data provided is not an array";
      throw err;
    }

    const data = await deleteBudgetById(budgetIds, userId);
    res.json({ data });
  } catch (error) {
    next(error);
  }
};
