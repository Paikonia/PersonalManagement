import { generateRandomAlphanumeric } from "../../utilities/generators";

export const insertNoteQueryBuilder = (
  noteObjects: NoteType[],
  userId: string
): { query: string; failed: NoteType[] } => {
  try {
    const data: {
      success: NoteType[];
      failed: NoteType[];
    } = {
      success: [],
      failed: [],
    };
    noteObjects.forEach((note) => {
      if (parseNoteInsertObject(note)) {
        data.success.push(note);
      } else {
        data.failed.push(note);
      }
    });
    console.log(data)
    const parsedString = data.success
      .map((success) => insertNoteQueryString(success, userId))
      .join();
    console.log('Parsed string: ', parsedString);
    if (parsedString === "") {
      return {
        failed: data.failed,
        query: "",
      };
    }
    const query = `INSERT INTO notesTable(title, note, dateCreated, media, notePrivacy, creator) \
    VALUES ${parsedString};`;
    return {
      query,
      failed: data.failed,
    };
  } catch (error) {
    throw error;
  }
};

const parseNoteInsertObject = (note: NoteType): boolean => {
  if (
    typeof note.title === "string" &&
    note.title.trim() !== "" &&
    "note" in note &&
    typeof note.note === "string" &&
    note.note.trim() !== "" &&
    ["private", "public"].includes(note.notePrivacy.toLocaleLowerCase()) 
  ) {
    return true;
  }
  return false;
};

const insertNoteQueryString = (note: NoteType, userId: string) => {
  const title = note.title;
  const noteText = `"${note.note}"`;
  const dateCreated = new Date(Date.now()).toISOString().split('T')[0]

  console.log({noteText})

  return `("${title}", ${noteText}, "${dateCreated}", '${JSON.stringify(
    note.media || '[]'
  )}', "${note.notePrivacy}", "${userId}")`;
};

export const updateNote = (
  noteId: number,
  updatedNote: Partial<NoteType>,
  userId: string
): string | null => {
  try {
    const parsed = parseNoteUpdateObject(updatedNote);
    if (Object.keys(parsed).length === 0) {
      return null;
    }
    return `UPDATE notesTable SET ${parsed} WHERE noteId = ${noteId} and creator = '${userId}';`;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const parseNoteUpdateObject = (note: Partial<NoteType>) => {
  const updateFields = [];
  if (typeof note.title === "string") {
    updateFields.push(`title = "${note.title}"`);
  }
  if ('note' in note && typeof note.note === "string") {
    updateFields.push(`note = "${note.note}"`);
  }
  if (note.dateCreated !== null && note.dateCreated instanceof Date) {
    updateFields.push(`dateCreated = "${note.dateCreated.toISOString()}"`);
  }
  if (typeof note.media !== "undefined") {
    updateFields.push(`media = '${JSON.stringify(note.media)}'`);
  }
  if (
    typeof note.notePrivacy === "string" &&
    ["private", "public"].includes(note.notePrivacy)
  ) {
    updateFields.push(`notePrivacy = "${note.notePrivacy}"`);
  }

  return updateFields.join(", ");
};


export const getAllNotesQuery = (userId: string): string => {
  try {
    return `SELECT * FROM notesTable where creator = '${userId}';`;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getNoteByIdQuery = (noteId: string, userId: string): string => {
  try {
    return `SELECT * FROM notesTable WHERE noteId = ${noteId} and creator = '${userId}';`;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteNoteByIdQuery = (noteIds: string[], userId: string): { delete: string; data: string }  => {
  try {
    const condition = noteIds.map(id => `noteId = ${Number(id)}`).join(' or ');
    return {
      delete: `DELETE FROM notesTable WHERE  (${condition}) and creator = '${userId}';`,
      data: `SELECT * FROM budgetTable WHERE (${condition}) and creator = '${userId}';`,
    };
  } catch (error) {
    throw error;
  }
};


