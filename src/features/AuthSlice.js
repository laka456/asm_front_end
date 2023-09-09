import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { value: "" },
  reducers: {
    login: (state) => {
      state.value = "login";
    },
    logout: (state) => {
      state.value = "logout";
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
