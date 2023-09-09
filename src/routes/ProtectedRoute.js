import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import MainLoader from "../Loader/MainLoader";

function ProtectedRoute() {
  const authState = useSelector((state) => state.authState.value);
  if (authState === "logout") {
    return <Navigate to={"/login"} replace />;
  } else if (authState === "login") {
    return <Outlet />;
  }
  return (
    <div className="mt-36">
      <MainLoader />
    </div>
  );
}

export default ProtectedRoute;
