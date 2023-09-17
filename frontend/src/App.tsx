import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthContextProvider } from "./Contexts/authContext";
import Login from "./Screens/Login";
import Mainlayout from "./Layout/Mainlayout";
import Home from "./Screens/Home";

const App = () => {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Routes>
          <Route element={<Mainlayout />}>
            <Route path="/" element={<Home />} />
          </Route>
          <Route path="/auth/login" element={<Login/>}/>
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  );
};

export default App;
