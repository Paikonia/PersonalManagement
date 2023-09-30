import { NextFunction, Request, Response } from "express";
import { createExpenseHandler, deleteExpenseHandler, getAllExpensesHandler, getExpenseByIdHandler, updateExpenseHandler } from "./handler";
import { GENERALERRORS } from "../Constants/OtherErrorDefinitions";

export const getExpenseItemController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userString = req.headers.user as string;
    if (!userString) {
      throw new Error("The request requires an authenticated user.");
    }
    const user = JSON.parse(userString);
    const expenses = await getAllExpensesHandler(user.userId);
    res.json(expenses);
  } catch (error) {
    next(error);
  }
};

export const getExpenseItemByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userString = req.headers.user as string;
    if (!userString) {
      throw new Error("The request requires an authenticated user.");
    }
    const user = JSON.parse(userString);
    const expenseId = req.params["expenseId"];
    if (!expenseId) throw new Error("Please provide an expense id");
    const expense = await getExpenseByIdHandler(expenseId, user.userId);
    res.json(expense);
  } catch (error) {
    next(error);
  }
};

export const postExpenseItemController = async(
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user, data } = req.body;
    if(!data || !Array.isArray(data)) {
      const error = GENERALERRORS.MalformedRequest
      error.message='The data you have passed must be an array of expenses'
      throw error;
    }
    const response = await createExpenseHandler(data, user.userId)
    res.json(response)
  } catch (error) {
    next(error);
  }
};

export const updateExpenseItemController = async(
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {data, user} = req.body

    if(!data || typeof data !== 'object' || (Array.isArray(data))) {
      const err = GENERALERRORS.MalformedRequest
      err.message='The request requires a data object that contains expenseIds and the changes to be updated'
      throw err
    }

    const returnedData = await updateExpenseHandler(data, user.userId)
    res.json(returnedData)
  } catch (error) {
    next(error);
  }
};

export const deleteExpenseItemController = async(
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {user, data } = req.body
    const {expenseIds} = data
    if (!expenseIds || !Array.isArray(expenseIds)) {
      const err = GENERALERRORS.MalformedRequest
      err.message ='Please provide and array of expense IDs to delete!'
      throw err
    }
    const returnedData = await deleteExpenseHandler(expenseIds, user.userId)
    res.json(returnedData)
  } catch (error) {
    next(error);
  }
};
