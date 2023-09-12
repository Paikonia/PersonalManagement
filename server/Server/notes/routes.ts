import { Router} from 'express'
import { deleteNoteItemController, getNoteItemByIdController, getNoteItemController, postNoteItemController, updateNoteItemController } from './controller';

const notesRoutes = Router()

notesRoutes.get('/', getNoteItemController)

notesRoutes.get("/:id", getNoteItemByIdController);

notesRoutes.post("/", postNoteItemController);

notesRoutes.patch("/", updateNoteItemController);

notesRoutes.delete("/", deleteNoteItemController);

export default notesRoutes
