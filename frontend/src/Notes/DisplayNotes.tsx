import { useState } from "react";
import { Card } from "../Components/ui/card";
import NotesDetailsDisplay from "./components/NotesDetailsDisplay";
import {Link} from 'react-router-dom'
import { Pencil } from 'lucide-react'
import { Note } from "../Contexts/useNotes";
import NotesDisplay from "./components/NotesDisplay";
const DisplayNotes = ({
  notes,
}: {
  notes: Note[];
}) => {
  const [note, setNote] = useState<NotesType>();
  const handleNoteClick = async (id: number) => {
    const n = notes.find(note => String(note.noteId) === String(id))
    setNote(n);
  };
  return (
    <div className="w-full">
      <Link className="btn" to="compose">
        <Pencil /> Add Note
      </Link>
      <div className={`${note ? "main-displays" : ""} my-2`}>
        <Card className={`mx-1 p-4  "w-full" `}>
          {notes.map((note: PartialNoteType) => (
            <NotesDisplay
              displayClick={handleNoteClick}
              noteId={note.noteId}
              title={note.title}
              dateCreated={note.dateCreated}
            />
          ))}
        </Card>
        <>{note && <NotesDetailsDisplay note={note} />}</>
      </div>
    </div>
  );
};

export default DisplayNotes;
