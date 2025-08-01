import { createSlice, PayloadAction } from "@reduxjs/toolkit";
//import { dummyMessages } from "@/app/data/store/slices/chat/messages";
import {
    getMessageThunk,
    getMessagesThunk,
    createMessageThunk,
    updateMessageThunk,
    deleteMessageThunk,
} from "@/app/data/message/thunk";
import { MessageUnion } from "@/app/data/message/types";


interface NormalizedMessages {
    byId: Record<number, MessageUnion>;
    messageIds: number[];
}
interface messageState {
    message: MessageUnion;
    messages: NormalizedMessages;
    loading: boolean;
    error?: string;
}
const initialMessage: MessageUnion = {
    id: Date.now(),
    senderId: Date.now(),
    receiverId: Date.now() + 1,
    timestamp: "",
    type: "text",
    content: {
        content: "",
    },
}
const initialState: messageState = {
    message: initialMessage,
    messages: {
        byId: {},
        messageIds: [],
    },
    loading: false,
    error: undefined,
}
const messageSlice = createSlice({
    name: "chatMessages",
    initialState,
    reducers: {
        setMessage: (state, action: PayloadAction<Extract<MessageUnion, { type: "text" }>>) => {
            state.message = action.payload;
        },
        setMessages: (state, action: PayloadAction<Extract<MessageUnion, { type: "text" }>[]>) => {
            state.messages.byId = {};
            state.messages.messageIds = [];
            action.payload.forEach(message => {
                state.messages.byId[message.id] = message;
                state.messages.messageIds.push(message.id);
            });
        },
        addMessage: (state, action: PayloadAction<Extract<MessageUnion, { type: "text" }>>) => {
            if (!state.messages.byId[action.payload.id]) {
                state.messages.byId[action.payload.id] = action.payload;
                state.messages.messageIds.push(action.payload.id);
            }
        },
        addMessages: (state, action: PayloadAction<Extract<MessageUnion, { type: "text" }>[]>) => {
            action.payload.forEach(message => {
                if (!state.messages.byId[message.id]) {
                    state.messages.byId[message.id] = message;
                    state.messages.messageIds.push(message.id);
                }
            });
        },

        updateMessage: (state, action: PayloadAction<Extract<MessageUnion, { type: "text" }>>) => {
            const message = action.payload;
            if (state.messages.byId[message.id]) {
                state.messages.byId[message.id] = message;
            }
        },

        deleteMessage: (state, action: PayloadAction<number>) => {
            const messageId = action.payload;
            if (state.messages.byId[messageId]) {
                delete state.messages.byId[messageId];
                state.messages.messageIds = state.messages.messageIds.filter(id => id !== messageId);
            }
        },

        resetMessageState: (state) => {
            state.message = initialMessage;
            state.messages.byId = {};
            state.messages.messageIds = [];
            state.error = undefined;
            state.loading = false;
        }
    },

    extraReducers: (builder) => {
        builder

            // Get one
            .addCase(getMessageThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(getMessageThunk.fulfilled, (state, action) => {
                state.loading = false;
                const msg = action.payload;
                state.messages.byId[msg.id] = msg;
                if (!state.messages.messageIds.includes(msg.id)) {
                    state.messages.messageIds.push(msg.id);
                }
            })
            .addCase(getMessageThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // Get all
            .addCase(getMessagesThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(getMessagesThunk.fulfilled, (state, action) => {
                state.loading = false;
                const msgs = action.payload;
                state.messages.byId = {};
                state.messages.messageIds = [];
                msgs.forEach((msg: MessageUnion) => {
                    state.messages.byId[msg.id] = msg;
                    state.messages.messageIds.push(msg.id);
                });
            })
            .addCase(getMessagesThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // Create
            .addCase(createMessageThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(createMessageThunk.fulfilled, (state, action) => {
                state.loading = false;
                const msg = action.payload;
                state.messages.byId[msg.id] = msg;
                if (!state.messages.messageIds.includes(msg.id)) {
                    state.messages.messageIds.push(msg.id);
                }
            })
            .addCase(createMessageThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // Update
            .addCase(updateMessageThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateMessageThunk.fulfilled, (state, action) => {
                state.loading = false;
                const msg = action.payload;
                state.messages.byId[msg.id] = msg;
            })
            .addCase(updateMessageThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // Delete
            .addCase(deleteMessageThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteMessageThunk.fulfilled, (state, action) => {
                state.loading = false;
                const id = action.payload;
                delete state.messages.byId[id];
                state.messages.messageIds = state.messages.messageIds.filter(
                    (msgId) => msgId !== id
                );
            })
            .addCase(deleteMessageThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
})



export const { setMessage, setMessages, addMessage, addMessages, updateMessage, deleteMessage } = messageSlice.actions
export default messageSlice.reducer