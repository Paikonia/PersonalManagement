import { useState } from "react";
import DisplayNotes from "./DisplayNotes";
import NoNotesCurrently from "./NoNotesCurrently";
import MarkdownEditor from "./components/MarkDownEditor";
import useNotes from "../Contexts/useNotes";

const NotesPage = () => {
  const {notes } = useNotes()
  // const [notes, setNotes] = useState<NotesType[]>([]);
  const [addEdit, setAddEdit] = useState<{ edit: "edit" | "add" | null }>({
    edit: null,
  });

  const changeToAdd = () => {
    setAddEdit({ edit: "add" });
  };
  const changeToDisplay =()=> {}

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
