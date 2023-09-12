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
exports.deleteNoteItemController = exports.updateNoteItemController = exports.postNoteItemController = exports.getNoteItemByIdController = exports.getNoteItemController = void 0;
const handlers_1 = require("./handlers");
const getNoteItemController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = JSON.parse(req.headers.user);
        const returnedData = yield (0, handlers_1.getAllNotesHandler)(user.userId);
        res.json(returnedData);
    }
    catch (error) {
        next(error);
    }
});
exports.getNoteItemController = getNoteItemController;
const getNoteItemByIdController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = JSON.parse(req.headers.user);
        const NoteId = req.params["id"];
        console.log(NoteId);
        const ret = yield (0, handlers_1.getNoteByIdHandler)(NoteId, user.userId);
        console.log(ret);
        res.json(ret);
    }
    catch (error) {
        next(error);
    }
});
exports.getNoteItemByIdController = getNoteItemByIdController;
const postNoteItemController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.body.user;
        const data = req.body.data;
        if (!Array.isArray(data)) {
            throw new Error('Invalid input type!');
        }
        const result = yield (0, handlers_1.createNoteHandler)(data, user.userId);
        res.json({ success: true, data: result });
    }
    catch (error) {
        next(error);
    }
});
exports.postNoteItemController = postNoteItemController;
const updateNoteItemController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body.data;
        const user = req.body.user;
        if (!data || !(data instanceof Object && !Array.isArray(data))) {
            throw new Error('Please include the updates and the id of the notes you want to update.');
        }
        const result = yield (0, handlers_1.updateNoteHandler)(data, user.userId);
        res.json(result);
    }
    catch (error) {
        next(error);
    }
});
exports.updateNoteItemController = updateNoteItemController;
const deleteNoteItemController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { noteIds } = req.body.data;
        const { userId } = req.body.user;
        if (!Array.isArray(noteIds)) {
            throw new Error("The data provided is not an array");
        }
        const data = yield (0, handlers_1.deleteNoteByIdHandler)(noteIds, userId);
        res.json({ data });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteNoteItemController = deleteNoteItemController;
