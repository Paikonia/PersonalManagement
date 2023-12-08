import React, { useState, useContext, createContext, useEffect } from "react";
import useFetch from "../utils/fetch";

export type Note = {
  noteId: string;
  title: string;
  dateCreated: string;
  note: string;
  media: any;
  notePrivacy: "private" | "public";
  creator: string;
};
type NotesContextValueReturnType = {
  notes: Note[];
  pageNumber: number;
  numberPerPage: number;
  current: Note|undefined|null;
  hasNext: boolean;
  hasPrevious: boolean;
  nextPage: () => void;
  previousPage: () => void;
  setCurrentNote(index:number): void;
};
type NotesContextProps = {
  children: any;
};
const notesContext = createContext<NotesContextValueReturnType>({
  notes: [],
  pageNumber: 0,
  numberPerPage: 5,
  current: null,
  nextPage: () => {},
  previousPage: () => {},
  hasNext: false,
  hasPrevious: false,
  setCurrentNote: () => {}
});

export const NotesContextProvider = ({ children }: NotesContextProps) => {
  const customFetch = useFetch();
  const [notes, setNotes] = useState<Note[]>([]);
  const [notesPage, setNotesPage] = useState<Note[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [numberPerPage, setNumberPerPage] = useState<number>(0);
  const [hasNext, setHasNext] = useState<boolean>(false);
  const [hasPrevious, setHasPrevious] = useState<boolean>(false);
  const [current, setCurrent] = useState<Note>()
  useEffect(() => {
    const getNotes = async () => {
      const data = await customFetch("/notes");
      console.log(data)
    //   setNotes(data);
    //   setNotesPage(data.slice(0, numberPerPage-1))
    };
    getNotes();
  }, []);

  const nextPage = () => {
    if(notes.length/numberPerPage>pageNumber){
        setPageNumber(pageNumber+1)
        const nPage = notes.slice(pageNumber*numberPerPage, (pageNumber*numberPerPage)+numberPerPage-1)
        setNotesPage(nPage)
    }
  };
  const previousPage = () => {};
  const setCurrentNote = () => {}
  return (
    <notesContext.Provider
      value={{
        notes,
        numberPerPage,
        pageNumber,
        current,
        hasNext,
        hasPrevious,
        nextPage,
        previousPage,
        setCurrentNote
      }}
    >
      {children}
    </notesContext.Provider>
  );
};

export const useNotes = () => {
  return useContext(notesContext);
};

export default useNotes;
