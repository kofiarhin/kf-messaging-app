import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getDataFetch } from "../../utils/services";
import { setMessage } from "../test/testSlice";

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
      const data = await getDataFetch(`/api/chats`);
      if (data.length > 0) {
        const sortedData = data.sort(
          (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
        );
        return sortedData;
      }
      return data;
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
