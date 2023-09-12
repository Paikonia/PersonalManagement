import { NextFunction, Request, Response } from "express";
import { getAllNotesHandler, getNoteByIdHandler, updateNoteHandler, deleteNoteByIdHandler, createNoteHandler} from "./handlers";

export const getNoteItemController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = JSON.parse(req.headers.user as string);
    const returnedData = await getAllNotesHandler(user.userId);
    res.json(returnedData);
  } catch (error) {
    next(error);
  }
};

export const getNoteItemByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = JSON.parse(req.headers.user as string);
    const NoteId = req.params["id"];
    console.log(NoteId)
    const ret = await getNoteByIdHandler(NoteId, user.userId);
    console.log(ret)
    res.json(ret);
  } catch (error) {
    next(error);
  }
};

export const postNoteItemController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.body.user;
    const data = req.body.data;
    if(!Array.isArray(data)) {
      throw new Error('Invalid input type!')
    }
    const result = await createNoteHandler(data, user.userId);
    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

export const updateNoteItemController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = req.body.data;
    const user = req.body.user;
    
    if(!data || !(data instanceof Object && !Array.isArray(data))) {
      throw new Error('Please include the updates and the id of the notes you want to update.')
    }
    const result = await updateNoteHandler(data, user.userId);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const deleteNoteItemController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { noteIds } = req.body.data;
    const { userId } = req.body.user;
    if (!Array.isArray(noteIds)) {
      throw new Error("The data provided is not an array");
    }
    const data = await deleteNoteByIdHandler(noteIds, userId);
    res.json({ data });
  } catch (error) {
    next(error);
  }
};
