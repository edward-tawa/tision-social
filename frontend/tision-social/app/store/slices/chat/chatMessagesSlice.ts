import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { messageUnion } from "@/app/data/message/types";
import { dummyMessages } from "@/app/data/store/slices/chat/messages";


const initialState = {
    messageArray: dummyMessages
}
const chatMessagesSlice = createSlice({
    name: "chatMessages",
    initialState,
    reducers: {
        addMessage: (state, action: PayloadAction<Extract<messageUnion, { type: 'text' }>>) => {
            state.messageArray.push(action.payload)
        },
    },
})



export const { addMessage } = chatMessagesSlice.actions
export default chatMessagesSlice.reducer