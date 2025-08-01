import { createAsyncThunk } from "@reduxjs/toolkit";
import {
    getMessageService,
    createMessageService,
    getMessagesService,
    updateMessageService,
    deleteMessageService
} from "@/app/data/message/services";
import { MessageUnion } from "@/app/data/message/types";




export const getMessageThunk = createAsyncThunk(
    "/message",
    async (messageId: number, { rejectWithValue }) => {
        try {
            return await getMessageService(messageId);
        }
        catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)

export const getMessagesThunk = createAsyncThunk(
    "/message/all",
    async (userId: number, { rejectWithValue }) => {
        try {
            return await getMessagesService(userId);
        }
        catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)


export const createMessageThunk = createAsyncThunk(
    "/Message/add",
    async (message: MessageUnion, { rejectWithValue }) => {
        try {
            return await createMessageService(message);
        }
        catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
)

export const updateMessageThunk = createAsyncThunk(
    "/message/update",
    async ({ messageId, message }: { messageId: number, message: Partial<MessageUnion> }, { rejectWithValue }) => {
        try {
            return await updateMessageService(messageId, message);
        }
        catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
)


export const deleteMessageThunk = createAsyncThunk(
    "/message/delete",
    async (messageId: number, { rejectWithValue }) => {
        try {
            return await deleteMessageService(messageId);
        }
        catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
)
