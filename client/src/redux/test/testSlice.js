import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: "",
  isSuccess: false,
  isLoading: false,
  isError: false,
};

export const testSlice = createSlice({
  name: "test",
  initialState,
  reducers: {
    reset: (state) => {
      (state.message = ""), (state.isLoading = false);
      state.isSuccess = false;
      state.isError = false;
    },
    setMessage: (state) => {
      state.message = "this is testing setting message";
    },
  },
});

export const { reset, setMessage } = testSlice.actions;

export default testSlice.reducer;
