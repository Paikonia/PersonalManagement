"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllNotesHandler = exports.deleteNoteByIdHandler = exports.updateNoteHandler = exports.getNoteByIdHandler = exports.createNoteHandler = void 0;
const database_1 = require("../database");
const notesDatabaseCalls_1 = require("../database/QueryBuilders/notesDatabaseCalls");
const createNoteHandler = (noteData, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { query, failed, params } = (0, notesDatabaseCalls_1.insertNoteQueryBuilder)(noteData, userId);
        console.log({ query, failed, params });
        let notes = [];
        if (query !== "") {
            notes = yield (0, database_1.makeQueriesWithParams)(query, params.flat());
        }
        return {
            notes,
            failed,
        };
    }
    catch (error) {
        throw error;
    }
});
exports.createNoteHandler = createNoteHandler;
const getNoteByIdHandler = (noteId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { query, params } = (0, notesDatabaseCalls_1.getNoteByIdQuery)(noteId, userId);
        const data = yield (0, database_1.makeQueriesWithParams)(query, params);
        return data[0];
    }
    catch (error) {
        throw error;
    }
});
exports.getNoteByIdHandler = getNoteByIdHandler;
const updateNoteHandler = (updatedData, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const returned = {
            success: "Partial",
            message: "A notification will be send incase any of the update entries fail.",
            failed: [],
        };
        const keys = Object.keys(updatedData);
        const queries = keys.map((key) => {
            const query = (0, notesDatabaseCalls_1.updateNote)(Number(key), updatedData[key], userId);
            if (!query) {
                returned["failed"] = [...returned.failed, updatedData[key]];
                return "";
            }
            return query;
        });
        queries.forEach((query) => {
            if (query)
                (0, database_1.makeQueriesWithParams)(query.query, query.params);
        });
        return returned;
    }
    catch (error) {
        throw error;
    }
});
exports.updateNoteHandler = updateNoteHandler;
const deleteNoteByIdHandler = (noteIds, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const queries = (0, notesDatabaseCalls_1.deleteNoteByIdQuery)(noteIds, userId);
        const result = yield (0, database_1.makeQueriesWithParams)(queries.data, queries.params);
        (0, database_1.makeQueriesWithParams)(queries.delete, queries.params).catch(error => {
            //TODO: failed request notification
            console.log(error);
        });
        return result;
    }
    catch (error) {
        throw error;
    }
});
exports.deleteNoteByIdHandler = deleteNoteByIdHandler;
const getAllNotesHandler = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { query, params } = (0, notesDatabaseCalls_1.getAllNotesQuery)(userId);
        const data = yield (0, database_1.makeQueriesWithParams)(query, params);
        return data;
    }
    catch (error) {
        throw error;
    }
});
exports.getAllNotesHandler = getAllNotesHandler;
