import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ActivePost {
    activePostId: number;
    isActive: boolean;
}


const initialState: ActivePost = {
    activePostId: Date.now(),
    isActive: false,
}

const activePostSlice = createSlice({
    name: "activePostSlice",
    initialState,
    reducers: {
        setPostActive: (state, action: PayloadAction<{ activePostId: number, isActive: boolean }>) => {
            state.activePostId = action.payload.activePostId;
            state.isActive = action.payload.isActive;
        },

        clearPostActive: (state) => {
            state.activePostId = 0;
            state.isActive = false;
        },
    }
})

export const { setPostActive, clearPostActive } = activePostSlice.actions;
export default activePostSlice.reducer;