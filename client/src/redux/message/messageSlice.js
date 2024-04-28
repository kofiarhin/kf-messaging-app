import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const getMessages = createAsyncThunk("message/getMessages", async(_, thunkApi) => {
        try {
            // const token = thunkAPI.getState().auth.user.token
            const conversationId = thunkApi.getState().conversation.currentConversationId; 
            const user = thunkApi.getState().auth.user;
            const res = await fetch(`/api/messages?conversationId=${conversationId}`)
            const { messages, conversationId: { participants},  ...rest} = await res.json();
            const indexOfUser = participants.indexOf(user._id)
          const otherUserIndex = participants.length - 1 - indexOfUser;
          const otherUserId = participants[otherUserIndex];

          const otherUserRes = await fetch(`/api/users/${otherUserId}`);
         const otherUserData = await otherUserRes.json();
        
         const dataToReturn = {
            participant: {
                ...otherUserData,
            },
            messages
         }

        return dataToReturn;
        } catch (error) {
             return thunkApi.rejectWithValue(error.message)
        }
});
const initialState = {
    messages: [],
    participant: null, 
    isLoading: false,
    isSuccess: false,
    isLoading: false,
    message: "",
    newMessage: false
}

export const messageSlice = createSlice({
    name: "message",
    initialState,
    reducers: {
        reset: (state) => {
            state.messages = [];
            state.participant = null;
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
            state.message = ""
        },
        setNewMessage: (state) => {
            state.newMessage = true;
        },
        resetNewMessage: (state) => {
            state.newMessage = false;
        }
    },
    extraReducers: (builder) =>  {

        builder.addCase(getMessages.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getMessages.fulfilled, (state, action) => {
            state.isLoading = false;
            state.messages = action.payload.messages;
            state.participant = action.payload.participant;
            state.isSuccess = true;
        })
        .addCase(getMessages.rejected, (state, action)=> {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
    }

})

export const { reset, setNewMessage, resetNewMessage } = messageSlice.actions;

export default messageSlice.reducer;