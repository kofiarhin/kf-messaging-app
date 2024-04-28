import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    showContacts: false,
    showChats: true,
    isSuccess: false
}

export const navigationSlice = createSlice({
    name: "navigation",
    initialState,
    reducers: {
        reset: (state) => {
            state.showChats = true;
            state.showContacts =  false;
            state.isSuccess = false
        },
        setShowContacts: (state) => {
            state.showContacts = true,
            state.showChats = false;
        },
        setShowChats: (state) => {
            state.showChats = true;
            state.showContacts = false;
        }
    }
})


export const { reset, setShowChats, setShowContacts } = navigationSlice.actions;

export default navigationSlice.reducer;