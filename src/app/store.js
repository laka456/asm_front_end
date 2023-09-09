import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../features/AuthSlice";
import userReducer from "../features/UserSlice";
import businessReducer from "../features/BusinessSlice"

export const store = configureStore({
  reducer: {
    userState: userReducer,
    businessState: businessReducer,
    authState: authReducer,
   
  },
});

