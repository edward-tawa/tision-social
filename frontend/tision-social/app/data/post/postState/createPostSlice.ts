import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type createPostState = {
    text: string;
    picture: File | null,
    video: File | null,

}
const initialState: createPostState = {
    text: "",
    picture: null,
    video: null,
}

const createPostSlice = createSlice({
    name: "createPostSlice",
    initialState,
    reducers: {
        setText: (state, action: PayloadAction<string>) => {
            state.text = action.payload;
        },
        setPicture: (state, action: PayloadAction<File | null>) => {
            state.picture = action.payload;
        },
        setVideo: (state, action: PayloadAction<File | null>) => {
            state.video = action.payload;
        },
        resetPost: (state) => {
            state.text = "";
            state.picture = null;
            state.video = null;
        },
    }
})

export const { setText, setPicture, setVideo, resetPost } = createPostSlice.actions;
export default createPostSlice.reducer;
