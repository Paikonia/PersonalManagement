import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../Contexts/authContext";
import Sidebar from "../Components/Sidebar";
const Mainlayout = () => {
  const { userToken } = useAuthContext();
  const location = useLocation();

  
  return userToken ? (
    <div>
      <Sidebar />
      <main className={"lg:ml-48 p-4"}>
        <Outlet />
      </main>
    </div>
  ) : (
    <Navigate to={"/auth/signin"} state={{ from: location }} replace />
  );
};

export default Mainlayout;
