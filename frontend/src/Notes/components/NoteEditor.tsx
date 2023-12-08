import React from 'react'
import ReactMarkdown from 'react-markdown';
import LabelledInput from '../../Components/LabelledInput';

interface NoteEditorProps {
    note: NotesType
    handleChange: (id:string, event:any) => void
    noteId:string
}

const NoteEditor = ({note, noteId, handleChange}:NoteEditorProps) => {
  return (
    <div>
      <div>
        <LabelledInput
          label="Title"
          id="title"
          name="title"
          value={note.title}
          onChange={(e: any) => {
            handleChange(noteId, e);
          }}
        />
        <div className="py-2 px-2 mx-2">
          <select
            id="privace"
            name="notePrivacy"
            value={note.notePrivacy}
            onChange={(e: any) => {
              handleChange(noteId, e);
            }}
            className="w-full mx-2 px-2 py-4"
          >
            <option value="private">Private</option>
            <option value="public">Public</option>
          </select>
        </div>
      </div>

      <div className="w-full p-2 mx-4 lg:grid lg:grid-cols-2 gap-2">
        <div className="w-full mb-4 ">
          <h1>Markdown Editor</h1>
          <textarea
            rows={10}
            cols={50}
            placeholder="Type your Markdown here..."
            value={note.note}
            name='note'
            onChange={(e: any) => {
              handleChange(noteId, e);
            }}
            className="w-full"
          />
        </div>
        <div className="w-full border-black border-2 rounded-sm">
          <h2>Preview:</h2>
          <div>
            <ReactMarkdown
              children={note.note}
              className="w-full p-4"
            ></ReactMarkdown>
          </div>
        </div>
      </div>
      <div className="flex  mt-4"></div>
    </div>
  );
}

export default NoteEditor