import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../Contexts/authContext";
const Mainlayout = () => {
  const { userToken } = useAuthContext();
  const location = useLocation();
  return userToken ? (
    <Outlet />
  ) : (
    <Navigate to={"/auth/login"} state={{ from: location }} replace />
  );
};

export default Mainlayout;
