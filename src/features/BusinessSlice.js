import { createSlice } from "@reduxjs/toolkit";

const businessSlice = createSlice({
  name: "business",
  initialState: { value: {}},
  reducers: {
    businessDetails: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { businessDetails } = businessSlice.actions;

export default businessSlice.reducer;
