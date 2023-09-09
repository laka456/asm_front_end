import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: { value: {} },
  reducers: {
    userDetails: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { userDetails } = userSlice.actions;
export default userSlice.reducer;
