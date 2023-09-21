import React, { useState } from "react";
import { NotesType, PartialNoteType } from "./dataTypesAndUtilities";
import NotesDisplay from "./components/NotesDisplay";
import useFetch from "../utils/fetch";
import { Card } from "../Components/ui/card";
import NotesDetailsDisplay from "./components/NotesDetailsDisplay";
import { Button } from "../Components/ui/button";

const DisplayNotes = ({ notes }: { notes: PartialNoteType[] }) => {
  const [note, setNotes] = useState<NotesType>()
  const fetch = useFetch()
  const handleNoteClick =async (id:number)=> {
    const specificNote = await fetch(`/notes/${id}`)
    setNotes(specificNote)
  }
  return (
    <div className="w-full">
      <Button>Add Note</Button>
      <div className="w-full flex my-2">
        <Card
          className={`mx-1 p-4 ${note ? "md:w-7/12 xl:w-5/12" : "w-full"} `}
        >
          {notes.map((note: PartialNoteType) => (
            <NotesDisplay
              key={note.noteId}
              title={note.title}
              noteId={note.noteId}
              dateCreated={note.dateCreated}
              displayClick={handleNoteClick}
            />
          ))}
        </Card>
        <>{note && <NotesDetailsDisplay note={note} />}</>
      </div>
    </div>
  );
};

export default DisplayNotes;
