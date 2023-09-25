import React, { useState } from "react";
import { NotesType, PartialNoteType } from "./dataTypesAndUtilities";
import NotesDisplay from "./components/NotesDisplay";
import useFetch from "../utils/fetch";
import { Card } from "../Components/ui/card";
import NotesDetailsDisplay from "./components/NotesDetailsDisplay";
import { Button } from "../Components/ui/button";
import { Pencil } from 'lucide-react'
const DisplayNotes = ({
  notes,
  changeToAdd,
}: {
  notes: PartialNoteType[];
  changeToAdd: ()=> void;
}) => {
  const [note, setNotes] = useState<NotesType>();
  const fetch = useFetch();
  const handleNoteClick = async (id: number) => {
    const specificNote = await fetch(`/notes/${id}`);
    setNotes(specificNote);
  };
  return (
    <div className="w-full">
      <Button onClick={changeToAdd}>
        <Pencil /> Add Note
      </Button>
      <div className={`${note ? "main-displays" : ""} my-2`}>
        <Card
          className={`mx-1 p-4  "w-full" `}
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
