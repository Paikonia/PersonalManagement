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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllNotesHandler = exports.deleteNoteByIdHandler = exports.updateNoteHandler = exports.getNoteByIdHandler = exports.createNoteHandler = void 0;
const database_1 = __importDefault(require("../database"));
const notesDatabaseCalls_1 = require("../database/QueryBuilders/notesDatabaseCalls");
const createNoteHandler = (noteData, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { query, failed } = (0, notesDatabaseCalls_1.insertNoteQueryBuilder)(noteData, userId);
        console.log('Query run: ', query);
        let notes = [];
        if (query !== "") {
            notes = yield (0, database_1.default)(query);
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
        const query = (0, notesDatabaseCalls_1.getNoteByIdQuery)(noteId, userId);
        console.log(query);
        const data = yield (0, database_1.default)(query);
        console.log(data);
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
            (0, database_1.default)(query);
        });
        console.log(queries);
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
        const result = yield (0, database_1.default)(queries.data);
        (0, database_1.default)(queries.delete);
        return result;
    }
    catch (error) {
        throw error;
    }
});
exports.deleteNoteByIdHandler = deleteNoteByIdHandler;
const getAllNotesHandler = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = (0, notesDatabaseCalls_1.getAllNotesQuery)(userId);
        const data = yield (0, database_1.default)(query);
        return data;
    }
    catch (error) {
        throw error;
    }
});
exports.getAllNotesHandler = getAllNotesHandler;
