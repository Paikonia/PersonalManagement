import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useFetch from "../utils/fetch";
import { NoteType } from "./Page";
import { Button } from "../Components/ui/button";
import NoteEditor from "./components/NoteEditor";

const EditNotes = () => {
  const { state } = useLocation();
  const fetch = useFetch();
  const [editedNotes, setEditedNotes] = useState<{ [key: string]: NoteType }>();
  useState(() => {
    const getter = async () => {
      const note = await fetch(`/notes/${state[0]}`);
      setEditedNotes(prev=> ({...prev, [note.noteId]: note}))
    };
    getter();
  });

 const handleChange =(noteId:string, e:any)=> {
    const {name, value} = e.target
    setEditedNotes(prev=> {
      if(prev) return {...prev, [noteId]:{...prev[noteId], [name]:value}}
    })
 }

 const navigate = useNavigate()
 const submitEdit =async() => {
    await fetch('/notes', {
      method: 'PATCH',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(editedNotes)
    }).catch(err=> {console.error(err)})
    navigate('/notes')
 }

  return <div>
    {editedNotes && Object.keys(editedNotes).map(key=> <NoteEditor note={editedNotes[key]} handleChange={handleChange} noteId={key}/>)}
    <Button onClick={submitEdit}>Submit Notes</Button>
  </div>;
};

export default EditNotes;
