import { createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import io from "socket.io-client";

export const socket = io.connect("http://localhost:5000");

const initialState = {
    socket: "",
}

export const connectSocket = createAsyncThunk("socket/connect", async(_, thunkApi) => {

    socket.on("connect", () => {
        console.log("client connected to server socket")
    } )
})

export const socketSlice = createSlice({
    name: "socket",
    initialState,
    reducers: {
        reset: (state) => {
            state.socket = ""
        },
    }
})

export const {  reset } = socketSlice.actions;

export default socketSlice.reducer;