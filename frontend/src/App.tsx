import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthContextProvider } from "./Contexts/authContext";
import Login from "./Screens/Login";
import Mainlayout from "./Layout/Mainlayout";
import Home from "./Screens/Home";
import Verify from "./Screens/Verify";
import Signup from "./Screens/Signup";

const App = () => {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Routes>
          <Route element={<Mainlayout />}>
            <Route path="/" element={<Home />} />
          </Route>
          <Route path="/auth/signin" element={<Login />} />
          <Route path="/auth/verify" element={<Verify />} />
          <Route path="/auth/signup" element={<Signup />} />
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  );
};

export default App;
