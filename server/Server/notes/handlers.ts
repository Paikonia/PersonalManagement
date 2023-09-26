import makeQueries from "../database";
import {
  insertNoteQueryBuilder,
  getNoteByIdQuery,
  updateNote,
  deleteNoteByIdQuery,
  getAllNotesQuery,
} from "../database/QueryBuilders/notesDatabaseCalls";

export const createNoteHandler = async (
  noteData: NoteType[],
  userId: string
): Promise<{ notes: NoteType[]; failed: any }> => {
  try {
    
    const { query, failed } = insertNoteQueryBuilder(noteData, userId);
    console.log('Query run: ', query)
    let notes: NoteType[] = [];
    if (query !== "") {
      notes = await makeQueries(query);
    }
    return {
      notes,
      failed,
    };
  } catch (error) {
    throw error;
  }
};

export const getNoteByIdHandler = async (
  noteId: string,
  userId: string
): Promise<NoteType | null> => {
  try {
    const query = getNoteByIdQuery(noteId, userId);
    console.log(query)
    const data = await makeQueries(query);
    console.log(data)
    return data[0] as NoteType
  } catch (error) {
    throw error;
  }
};

export const updateNoteHandler = async (
  updatedData: { [key: string]: any },
  userId: string
): Promise<any> => {
  try {
    const returned: UpdateReturnType = {
      success: "Partial",
      message:
        "A notification will be send incase any of the update entries fail.",
      failed: [],
    };
    const keys = Object.keys(updatedData);
    const queries = keys.map((key) => {
      const query = updateNote(Number(key), updatedData[key], userId);
      if (!query) {
        returned["failed"] = [...returned.failed, updatedData[key]];
        return "";
      }
      return query;
    });
    queries.forEach((query) => {
      makeQueries(query);
    });
    console.log(queries)
    return returned;
  } catch (error) {
    throw error;
  }
};

export const deleteNoteByIdHandler = async (
  noteIds: string[],
  userId: string
): Promise<any> => {
  try {
    
      const queries = deleteNoteByIdQuery(noteIds, userId);
      const result = await makeQueries(queries.data)
      makeQueries(queries.delete)
      return result
  } catch (error) {
    throw error;
  }
};

export const getAllNotesHandler = async (
  userId: string
): Promise<NoteType[]> => {
  try {
    const query = getAllNotesQuery(userId);
    const data = await makeQueries(query);
    return data as NoteType[];
  } catch (error) {
    throw error;
  }
};
