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
        const placeholder = data.success.map(() => "(?, ?, ?, ?, ?, ?)").join(", ");
        const params = data.success.map((success) => insertNoteQueryString(success, userId));
        if (data.success.length === 0) {
            return {
                failed: data.failed,
                query: "",
                params: [],
            };
        }
        const query = `INSERT INTO notesTable(title, note, dateCreated, media, notePrivacy, creator) \
    VALUES ${placeholder};`;
        return {
            query,
            params,
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
    const dateCreated = new Date(Date.now()).toISOString().split("T")[0];
    const media = JSON.stringify(note.media || "[]");
    return [note.title, note.note, dateCreated, media, note.notePrivacy, userId];
};
const updateNote = (noteId, updatedNote, userId) => {
    try {
        const parsed = parseNoteUpdateObject(updatedNote);
        if (Object.keys(parsed).length === 0) {
            return null;
        }
        return {
            query: `UPDATE notesTable SET ${parsed.placeholder} WHERE noteId = ? and creator = ?;`,
            params: [...parsed.updateFields, Number(noteId), userId],
        };
    }
    catch (error) {
        console.error(error);
        throw error;
    }
};
exports.updateNote = updateNote;
const parseNoteUpdateObject = (note) => {
    const updateFields = [];
    const placeHolder = [];
    if (typeof note.title === "string") {
        updateFields.push(note.title);
        placeHolder.push("title = ?");
    }
    if ("note" in note && typeof note.note === "string") {
        updateFields.push(note.note);
        placeHolder.push("note = ?");
    }
    if (note.dateCreated !== null && note.dateCreated instanceof Date) {
        const dateCreated = note.dateCreated.toISOString();
        updateFields.push(dateCreated);
        placeHolder.push("dateCreated = ?");
    }
    if (typeof note.media !== "undefined") {
        const media = JSON.stringify(note.media);
        updateFields.push(media);
        placeHolder.push("media = ?");
    }
    if (typeof note.notePrivacy === "string" &&
        ["private", "public"].includes(note.notePrivacy)) {
        updateFields.push(note.notePrivacy);
        placeHolder.push("notePrivacy = ?");
    }
    return { updateFields, placeholder: placeHolder.join(", ") };
};
const getAllNotesQuery = (userId) => {
    try {
        return {
            query: `SELECT * FROM notesTable where creator = ?;`,
            params: [userId],
        };
    }
    catch (error) {
        throw error;
    }
};
exports.getAllNotesQuery = getAllNotesQuery;
const getNoteByIdQuery = (noteId, userId) => {
    try {
        return {
            query: `SELECT * FROM notesTable WHERE noteId = ? and creator = ?;`,
            params: [noteId, userId],
        };
    }
    catch (error) {
        console.error(error);
        throw error;
    }
};
exports.getNoteByIdQuery = getNoteByIdQuery;
const deleteNoteByIdQuery = (noteIds, userId) => {
    try {
        const condition = noteIds.map(() => "? ").join(", ");
        return {
            delete: `DELETE FROM notesTable WHERE noteId in (${condition}) and creator = ?;`,
            data: `SELECT * FROM notesTable WHERE noteId in (${condition}) and creator = ?;`,
            params: [...noteIds, userId],
        };
    }
    catch (error) {
        throw error;
    }
};
exports.deleteNoteByIdQuery = deleteNoteByIdQuery;
