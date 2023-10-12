import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './Login';
import Verify from './Verify';
import Signup from './Signup';

const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="/signin" element={<Login />} />
      <Route path="/verify" element={<Verify />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
}

export default AuthRoutes

