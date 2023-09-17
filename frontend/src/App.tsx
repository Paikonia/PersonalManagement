import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthContextProvider } from "./Contexts/authContext";
import Login from "./Screens/Login";

const App = () => {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Routes>
          <Route path="/auth" element={<Login/>}/>
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  );
};

export default App;
