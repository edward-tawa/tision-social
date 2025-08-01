import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ChatVisibleState {
    isVisible: boolean;
    position: {
        bottom: number,
        right: number
    }
}

const initialState: ChatVisibleState = {
    isVisible: false,
    position: {
        bottom: 0,
        right: 0
    }
}


const chatVisibleStateSlice = createSlice({
    name: "chatVisibleSlice",
    initialState,
    reducers: {
        setChatVisible: (state: ChatVisibleState, action: PayloadAction<{ isVisible: boolean }>) => {
            if (action.payload) {
                state.isVisible = action.payload.isVisible;
            }
        },
        setChatPosition: (state: ChatVisibleState, action) => {
            if (action.payload) {
                state.position = {
                    bottom: action.payload.bottom,
                    right: action.payload.right
                }
            }
        }

    },
})

export const { setChatVisible, setChatPosition } = chatVisibleStateSlice.actions;
export default chatVisibleStateSlice.reducer;
