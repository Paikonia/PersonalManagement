import { useEffect, useState } from "react";
import DisplayNotes from "./DisplayNotes";
import NoNotesCurrently from "./NoNotesCurrently";
import useFetch from "@/utils/fetch";

export type Note = {
  noteId: string;
  title: string;
  dateCreated: string;
  note: string;
  media: object[];
  notePrivacy: "private" | "public";
  creator: string;
};

const NotesPage = () => {
  const customFetch = useFetch();
  const [notes, setNotes] = useState<Note[]>([]);
  const [notesInPage, setNotesInPage] = useState<Note[]>([]);
  // const [pageNumber, setPageNumber] = useState<number>(1);
  const [numberPerPage] = useState<number>(0);
  const [notesLoading, setNotesLoading] = useState<boolean>(false);
  // const [hasNext, setHasNext] = useState<boolean>(false);
  // const [hasPrevious, setHasPrevious] = useState<boolean>(false);
  // const [current, setCurrent] = useState<Note>();
  useEffect(() => {
    const getNotes = async () => {
      setNotesLoading(true);
      try {
        const data = (await customFetch("/notes")) as Note[];

        setNotes(data);
        setNotesInPage(data);
      } catch (error) {
        console.log(error);
      } finally {
        setNotesLoading(false);
      }
    };
    getNotes();
  }, [numberPerPage]);
  console.log(notes);
  if (notesLoading) {
    return <h1>Loading notes</h1>;
  }
  return (
    <div>
      {notesInPage.length <= 0 ? (
        <NoNotesCurrently />
      ) : (
        <DisplayNotes notes={notesInPage} />
      )}
    </div>
  );
};

export default NotesPage;
