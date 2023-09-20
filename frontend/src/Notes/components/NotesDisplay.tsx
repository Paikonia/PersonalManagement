import React from "react";
import EditDeleteButtons from "../../Components/EditDeleteButtons";
import { PartialNoteType } from "../dataTypesAndUtilities";



const NotesDisplay = ({ noteId, title, dateCreated }: PartialNoteType) => {
  return (
    <div className="border-2 md:w-7/12 xl:w-5/12 overflow-hidden rounded-xl p-2 flex  mb-4 justify-between">
      <div className="flex w-10/12 sm:w-10/12 md:w-11/12 xl:w-5/6 px-1 py-0 left-0 justify-start items-center">
        <input type="checkbox" className="mx-1" name={String(noteId)} id={String(noteId)} />
        <p className="ml-2 w-30  sm:w-42 max-w-xs mr-2 truncate">{title}</p>
        <h3 className="mr-2 w-20">{dateCreated?.toISOString().split('T')[0]}</h3>
        
      </div>
      <EditDeleteButtons />
    </div>
  );
};

export default NotesDisplay;
