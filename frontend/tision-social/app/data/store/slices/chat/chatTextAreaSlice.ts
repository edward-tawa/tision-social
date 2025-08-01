import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface textAreaState {
    message: string
}

const initialState = {
    message: ""
}

const chatTextAreaSlice = createSlice({
    name: "chatTextAreaSlice",
    initialState,
    reducers: {
        setTextArea(state: textAreaState, action: PayloadAction<string>) {
            state.message = action.payload;
        },
    },
})


export const { setTextArea } = chatTextAreaSlice.actions
export default chatTextAreaSlice.reducer