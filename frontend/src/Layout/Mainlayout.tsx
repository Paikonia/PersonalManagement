import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../Contexts/authContext";
import Sidebar from "../Components/Sidebar";
import NavBar from "../Components/NavBar";
import { NavContextProvider } from "../Contexts/sidebarContext";
const Mainlayout = () => {
  const { userToken } = useAuthContext();
  const location = useLocation();
  return userToken ? (
    <NavContextProvider>
      <Sidebar />
      <NavBar />
      <main className={"lg:ml-48 p-4"}>
        <Outlet />
      </main>
    </NavContextProvider>
  ) : (
    <Navigate to={"/auth/signin"} state={{ from: location }} replace />
  );
};

export default Mainlayout;
