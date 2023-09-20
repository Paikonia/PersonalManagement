import React from "react";
import { PartialNoteType } from "./dataTypesAndUtilities";
import NotesDisplay from "./components/NotesDisplay";

const DisplayNotes = ({ notes }: { notes: PartialNoteType[] }) => {
  return (
    <div>
      <div>
        {notes.map((note: PartialNoteType) => (
          <NotesDisplay
            title={note.title}
            noteId={note.noteId}
            dateCreated={note.dateCreated}
          />
        ))}
      </div>
    </div>
  );
};

export default DisplayNotes;
