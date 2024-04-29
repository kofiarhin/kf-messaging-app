import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getDataFetch } from "../../utils/services";

const initialState = {
  data: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

export const getChatData = createAsyncThunk(
  "chat/getChatData",
  async (_, thunkApi) => {
    try {
      const user = thunkApi.getState().auth.user;
      const userId = user._id;
      const conversations = user.conversations;
      const convoData = await Promise.all(
        conversations.map(async (c) => {
          const conData = await getDataFetch(`/api/conversations/${c}`);
          const { participants } = conData;

          const indexOfUser = participants.indexOf(user._id);
          const otherUserId =
            participants[participants.length - 1 - indexOfUser];
          const otherUserData = await getDataFetch(`/api/users/${otherUserId}`);
          //  get messages
          const mesData = await getDataFetch(
            `/api/messages?conversationId=${c}`
          );
          const { updatedAt, messages, ...rest } = mesData;
          const dataToReturn = {
            updatedAt,
            messages,
            participant: otherUserData,
            conversationId: c,
          };

          return dataToReturn;
        })
      );

      const sortedData = convoData.sort(
        (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
      );
      return sortedData;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.data = [];
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getChatData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getChatData.fulfilled, (state, action) => {
        state.issLoading = false;
        state.data = action.payload;
        state.isSuccess = true;
      })
      .addCase(getChatData.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = chatSlice.actions;

export default chatSlice.reducer;
