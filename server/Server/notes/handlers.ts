import makeQueries, { makeQueriesWithParams } from "../database";
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
): Promise<{ success:string; failed: any }> => {
  try {
    
    const { query, failed, params } = insertNoteQueryBuilder(noteData, userId);
    console.log({ query, failed, params });
    let notes: NoteType[] = [];
    if (query !== "") {
      notes = await makeQueriesWithParams(query, params.flat());
    }
    return {
      success:
        failed.length > 0 && query !== ""
          ? "Partially successful"
          : query === "" && failed.length > 0
          ? "Failed parse data"
          : "Success",
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
    const {query, params} = getNoteByIdQuery(noteId, userId);
    const data = await makeQueriesWithParams(query, params);
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
      if(query)
      makeQueriesWithParams(query.query, query.params);
    });
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
      const result = await makeQueriesWithParams(queries.data, queries.params)
      makeQueriesWithParams(queries.delete, queries.params).catch(error => {
        //TODO: failed request notification
        console.log(error)
      })
      return result
  } catch (error) {
    throw error;
  }
};

export const getAllNotesHandler = async (
  userId: string
): Promise<NoteType[]> => {
  try {
    const {query, params} = getAllNotesQuery(userId);
    const data = await makeQueriesWithParams(query, params);
    return data as NoteType[];
  } catch (error) {
    throw error;
  }
};
