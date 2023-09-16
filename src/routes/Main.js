import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Navigate, Route, Routes} from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import WebLayout from "../layouts/WebLayout";
import MainLoader from "../Loader/MainLoader";
import Consultant from "../views/dashboard/Consultant";
import Dashboard from "../views/dashboard/Dashboard";
import Seekers from "../views/dashboard/Seekers";
import Login from "../views/web/Login";
import ProtectedRoute from "./ProtectedRoute";

import InitialRoute from "./InitialRoute";
import ResetPassword from "../views/web/ResetPassword";

import io from "socket.io-client";

import UserProfile from "../views/dashboard/UserProfile";
import Users from "../views/dashboard/Users";
import Appointment from "../views/dashboard/Appointment";
import {GetMeApi} from "../api/User/GetMeApi";
import {userDetails} from "../features/UserSlice";
import {login, logout} from "../features/AuthSlice";

function Main() {
    const authState = useSelector((state) => state.authState.value);
    const userState = useSelector((state) => state.userState.value);


    const dispatch = useDispatch();
    const socket = io(`${process.env.REACT_APP_API_URL}`);

    useEffect(() => {
            if (authState === "logout") {
                localStorage.setItem("authToken", "");
                dispatch(logout());
            } else {
                dispatch(login());
            }

    }, [authState]);



    return authState ? (
        <Routes>
            <Route element={<InitialRoute/>}>
                <Route element={<WebLayout/>}>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="reset-password/:token" element={<ResetPassword/>}/>
                    <Route path="*" element={<Navigate replace to="/login"/>}/>
                </Route>
            </Route>
            <Route element={<ProtectedRoute/>}>
                <Route path="/*" element={<DashboardLayout/>}>
                    <Route path="dashboard" element={<Dashboard/>}/>
                    <Route path="appointments" element={<Appointment/>}/>
                    <Route path="consultants" element={<Consultant/>}/>
                    <Route path="seekers" element={<Seekers/>}/>
                    <Route path="Users" element={<Users/>}/>



                    <Route path="*" element={<Navigate replace to="/dashboard"/>}/>
                </Route>
            </Route>
        </Routes>
    ) : (
        <div className="mt-36">

            <MainLoader/>
        </div>
    );
}

export default Main;
