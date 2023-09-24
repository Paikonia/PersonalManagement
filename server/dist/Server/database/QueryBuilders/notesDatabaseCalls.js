"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNoteByIdQuery = exports.getNoteByIdQuery = exports.getAllNotesQuery = exports.updateNote = exports.insertNoteQueryBuilder = void 0;
const insertNoteQueryBuilder = (noteObjects, userId) => {
    try {
        const data = {
            success: [],
            failed: [],
        };
        noteObjects.forEach((note) => {
            if (parseNoteInsertObject(note)) {
                data.success.push(note);
            }
            else {
                data.failed.push(note);
            }
        });
        const parsedString = data.success
            .map((success) => insertNoteQueryString(success, userId))
            .join();
        console.log(parsedString);
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
    }
    catch (error) {
        throw error;
    }
};
exports.insertNoteQueryBuilder = insertNoteQueryBuilder;
const parseNoteInsertObject = (note) => {
    if (typeof note.title === "string" &&
        note.title.trim() !== "" &&
        "note" in note &&
        typeof note.note === "string" &&
        note.note.trim() !== "" &&
        ["private", "public"].includes(note.notePrivacy.toLocaleLowerCase())) {
        return true;
    }
    return false;
};
const insertNoteQueryString = (note, userId) => {
    const title = note.title;
    const noteText = `"${note.note}"`;
    const dateCreated = new Date(Date.now()).toISOString().split('T')[0];
    console.log({ noteText });
    return `("${title}", ${noteText}, "${dateCreated}", '${JSON.stringify(note.media || '[]')}', "${note.notePrivacy}", "${userId}")`;
};
const updateNote = (noteId, updatedNote, userId) => {
    try {
        const parsed = parseNoteUpdateObject(updatedNote);
        if (Object.keys(parsed).length === 0) {
            return null;
        }
        return `UPDATE notesTable SET ${parsed} WHERE noteId = ${noteId} and creator = '${userId}';`;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
};
exports.updateNote = updateNote;
const parseNoteUpdateObject = (note) => {
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
    if (typeof note.notePrivacy === "string" &&
        ["private", "public"].includes(note.notePrivacy)) {
        updateFields.push(`notePrivacy = "${note.notePrivacy}"`);
    }
    return updateFields.join(", ");
};
const getAllNotesQuery = (userId) => {
    try {
        return `SELECT * FROM notesTable where creator = '${userId}';`;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
};
exports.getAllNotesQuery = getAllNotesQuery;
const getNoteByIdQuery = (noteId, userId) => {
    try {
        return `SELECT * FROM notesTable WHERE noteId = ${noteId} and creator = '${userId}';`;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
};
exports.getNoteByIdQuery = getNoteByIdQuery;
const deleteNoteByIdQuery = (noteIds, userId) => {
    try {
        const condition = noteIds.map(id => `noteId = ${Number(id)}`).join(' or ');
        return {
            delete: `DELETE FROM notesTable WHERE  (${condition}) and creator = '${userId}';`,
            data: `SELECT * FROM budgetTable WHERE (${condition}) and creator = '${userId}';`,
        };
    }
    catch (error) {
        throw error;
    }
};
exports.deleteNoteByIdQuery = deleteNoteByIdQuery;
