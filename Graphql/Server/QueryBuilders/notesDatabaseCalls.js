const makeDatabaseCall = require("../database/mysqlIndex");
const insertNote = async (noteObject, userId) => {
  try {
    console.log(noteObject)
    const parsed = parseNoteInsertObject(noteObject, userId);
    console.log('Hello: ', parsed)
    if (parsed === '') {
      return null;
    }
    console.log(parsed)
    await makeDatabaseCall(parsed);

    return parsed;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const parseNoteInsertObject = (note, userId) => {
  if (
    "title" in note &&
    typeof note.title === "string" &&
    "note" in note &&
    typeof note.note === "string" //&&
    // "media" in note &&
    // typeof note.media === "object" //&&
    // "notePrivacy" in note &&
    // (note.notePrivacy === "public" || note.notePrivacy === "private")
  ) {
    return `INSERT INTO notesTable(title, note, media, notePrivacy, creator) \
    VALUES('${note.title}', '${note.note}', '${JSON.stringify(note.media)}', \
    '${note.notePrivacy}', '${userId}');`;
  }
  return '';
};


const updateNote = async (noteId, updatedNote) => {
  try {
    const parsed = parseNoteUpdateObject(updatedNote);
    if (Object.keys(parsed).length === 0) {
      return null;
    }

    await makeDatabaseCall(
      `UPDATE notesTable SET ${parsed} WHERE noteId = '${noteId}';`
    );

    return parsed;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const parseNoteUpdateObject = (note) => {
  const updateFields = [];
  if ("title" in note && typeof note.title === "string") {
    updateFields.push(`title = '${note.title}'`);
  }
  if ("note" in note && typeof note.note === "string") {
    updateFields.push(`note = '${note.note}'`);
  }
  if ("media" in note && typeof note.media === "object") {
    updateFields.push(`media = '${JSON.stringify(note.media)}'`);
  }
  if (
    "notePrivacy" in note &&
    (note.notePrivacy === "public" || note.notePrivacy === "private")
  ) {
    updateFields.push(`notePrivacy = '${note.notePrivacy}'`);
  }

  return updateFields.join(", ");
};

const deleteNoteById = async (noteId) => {
  try {
    await makeDatabaseCall(
      `DELETE FROM notesTable WHERE noteId = '${noteId}';`
    );
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getAllNotes = async () => {
  try {
    const notes = await makeDatabaseCall("SELECT * FROM notesTable;");
    return notes;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getNoteById = async (noteId) => {
  try {
    const note = await makeDatabaseCall(
      `SELECT * FROM notesTable WHERE noteId = '${noteId}';`
    );
    return note;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = {
  insertNote,
  updateNote,
  getAllNotes,
  getNoteById,
  deleteNoteById,
};
