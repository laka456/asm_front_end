import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import MainLoader from "../Loader/MainLoader";

function InitialRoute() {
  const authState = useSelector((state) => state.authState.value);
  if (authState === "login") {
    return <Navigate to={"/dashboard"} replace />;
  } else if (authState === "logout") {
    return <Outlet />;
  }
  return <MainLoader />;
}

export default InitialRoute;
