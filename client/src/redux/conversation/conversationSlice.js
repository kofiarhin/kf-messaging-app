import { createSlice} from "@reduxjs/toolkit";

const initialState = {
    currentConversationId: "",
    isLoading: false,
    isSuccess: "",
    isError: "",
    messagee: ""
}

export const conversationSlice = createSlice({
    name: "conversation",
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = false;
            state.message = false;
        },
        setConversationId: (state, action) => {
            state.currentConversationId =  action.payload
        }
    }
})

export const { reset, setConversationId } = conversationSlice.actions;

export default conversationSlice.reducer;
