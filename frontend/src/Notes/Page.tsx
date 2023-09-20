import React, { useEffect, useState } from "react";
import DisplayNotes from "./DisplayNotes";
import NoNotesCurrently from "./NoNotesCurrently";

interface NoteType {
  noteId: number;
  title: string;
  note: string | null;
  dateCreated: Date | null;
  media: any;
  notePrivacy: "private" | "public";
  creator: string;
}

const NotesPage = () => {
  const [notes, setNotes] = useState<NoteType[]>([]);
  
  useEffect(() => {
    const getNotes = async () => {
    };
    getNotes();
    setNotes([])
  },[]);

  return (
    <div>
      {notes.length <= 0 ? (<NoNotesCurrently />) : (
        <DisplayNotes notes={notes} />
      )}
    </div>
  );
};

export default NotesPage;
