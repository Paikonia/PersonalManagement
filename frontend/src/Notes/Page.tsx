import React, { useEffect, useState } from "react";
import DisplayNotes from "./DisplayNotes";
import NoNotesCurrently from "./NoNotesCurrently";
import useFetch from "../utils/fetch";
import MarkdownEditor from "./components/MarkDownEditor";

export interface NoteType {
  noteId: number;
  title: string;
  note: string;
  dateCreated: Date | null;
  media: any;
  notePrivacy: "private" | "public";
  creator: string;
}

const NotesPage = () => {
  const [notes, setNotes] = useState<NoteType[]>([]);
  const [addEdit, setAddEdit] = useState<{ edit: "edit" | "add" | null }>({
    edit: null,
  });

  const changeToAdd = () => {
    
    setAddEdit({ edit: "add" });
  
  };
  const changeToDisplay =async () => {
    const data = await fetch("/notes");
    setNotes(data);
    setAddEdit({ edit: null });
  };
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
      {addEdit.edit === null ? (
        <div>
          {notes.length <= 0 ? (
            <NoNotesCurrently changeToAdd={changeToAdd} />
          ) : (
            <DisplayNotes changeToAdd={changeToAdd} notes={notes} />
          )}
        </div>
      ) : (
        addEdit.edit === "add" && (
          <div>
            <MarkdownEditor changeToDisplay={changeToDisplay} />
          </div>
        )
      )}
    </div>
  );
};

export default NotesPage;
