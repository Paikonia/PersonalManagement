import { NextFunction, Request, Response } from "express";
import { getAllNotesHandler, getNoteByIdHandler, updateNoteHandler, deleteNoteByIdHandler, createNoteHandler} from "./handlers";
import { GENERALERRORS } from "../Constants/OtherErrorDefinitions";

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
      const err = GENERALERRORS.MalformedRequest
      err.message ='The data you have entered in malformed. Includes the updates as specified in the documentation'
      throw err
    }
    const result = await createNoteHandler(data, user.userId);
    res.json(result);
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
      const err = GENERALERRORS.MalformedRequest
      err.message =
        "Please include the updates and the id of the notes you want to update.";
      throw err
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
      const err = GENERALERRORS.MalformedRequest
      err.message =
        "The data provided is not an array of notes to be deleted. Follow the documentation.";

      throw err
    }
    const data = await deleteNoteByIdHandler(noteIds, userId);
    res.json({ data });
  } catch (error) {
    next(error);
  }
};
