import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import contactReducer from "./contact/contactSlice";
import conversationReducer from "./conversation/conversationSlice";
import navigationReducer from "./navigation/navigationSlice";
import socketReducer from "./socket/socketSlice";
import messageReducer from "./message/messageSlice";
import chatReducer from "./chat/chatSlice";

export const store = configureStore({
  reducer: {
    // add reducers here
    auth: userReducer,
    contact: contactReducer,
    conversation: conversationReducer,
    navigation: navigationReducer,
    socket: socketReducer,
    message: messageReducer,
    chat: chatReducer,
  },
});
