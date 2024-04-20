import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  contacts: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

export const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
});

export const { reset } = contactSlice.actions;

export default contactSlice.reducer;
