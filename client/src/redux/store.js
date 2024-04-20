import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import contactReducer from "./contact/contactSlice";

export const store = configureStore({
  reducer: {
    // add reducers here
    auth: userReducer,
    contact: contactReducer,
  },
});
