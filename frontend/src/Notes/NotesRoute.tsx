import React from 'react'
import { Route, Routes } from 'react-router-dom'
import NotesPage from './Page';
import EditNotes from './EditNotes';

const NotesRoute = () => {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<NotesPage />} />
        <Route path="edit/" element={<EditNotes />} />
      </Route>
    </Routes>
  );
}

export default NotesRoute