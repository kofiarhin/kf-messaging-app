import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getDataFetch } from "../../utils/services";

const initialState = {
  currentConversationId: "",
  participant: null,
  isLoading: false,
  isSuccess: "",
  isError: "",
  messagee: "",
};

export const getParticipant = createAsyncThunk(
  "conversation/getParticipant",
  async (conversationId, thunkApi) => {
    try {
      const user = thunkApi.getState().auth.user;
      const res = await fetch(`/api/conversations/${conversationId}`);
      const data = await res.json();

      if (res.ok) {
        const { participants } = data;

        const indexOfUser = participants.indexOf(user._id);
        const otherUserId = participants[participants.length - 1 - indexOfUser];
        const otherUserData = await getDataFetch(`/api/users/${otherUserId}`);

        if (otherUserData) {
          return otherUserData;
        }
      }
    } catch (error) {
      console.log(error.message);
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const conversationSlice = createSlice({
  name: "conversation",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = false;
      state.participant = null;
    },
    setConversationId: (state, action) => {
      state.currentConversationId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getParticipant.pending, (state) => {
        state.isLoading = false;
      })
      .addCase(getParticipant.fulfilled, (state, action) => {
        state.isLoading = false;
        state.participant = action.payload;
        state.isSuccess = true;
      })
      .addCase(getParticipant.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset, setConversationId } = conversationSlice.actions;

export default conversationSlice.reducer;
