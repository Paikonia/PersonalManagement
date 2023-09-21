import React, { useEffect, useState } from "react";
import DisplayNotes from "./DisplayNotes";
import NoNotesCurrently from "./NoNotesCurrently";
import useFetch from "../utils/fetch";

export interface NoteType {
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
  const fetch = useFetch();
  useEffect(() => {
    const getNotes = async () => {
      const data = await fetch("/notes");
      setNotes(data);
    };
    getNotes();
  }, []);

  return (
    <div>
      <div>
        
        {notes.length <= 0 ? (
          <NoNotesCurrently />
        ) : (
          <DisplayNotes notes={notes} />
        )}
      </div>
      <div>

      </div>
    </div>
  );
};

export default NotesPage;
