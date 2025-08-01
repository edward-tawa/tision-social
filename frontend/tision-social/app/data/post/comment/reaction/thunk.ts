import { createAsyncThunk } from "@reduxjs/toolkit";
import {
    getReactionService,
    createReactionService,
    getReactionsService,
    updateReactionService,
    deleteReactionService
} from "@/app/data/post/comment/reaction/services";
import { Reaction } from "@/app/data/post/comment/reaction/types";




export const getReactionThunk = createAsyncThunk(
    "/reactions/Reaction",
    async (reactionId: number, { rejectWithValue }) => {
        try {
            return await getReactionService(reactionId);
        }
        catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)

export const getReactionsThunk = createAsyncThunk(
    "/reactions/all",
    async (userId: number, { rejectWithValue }) => {
        try {
            return await getReactionsService(userId);
        }
        catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)


export const createReactionThunk = createAsyncThunk(
    "/reactions/add",
    async (reaction: Reaction, { rejectWithValue }) => {
        try {
            return await createReactionService(reaction);
        }
        catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
)

export const updateReactionThunk = createAsyncThunk(
    "/reactions/update",
    async ({ reactionId, reaction }: { reactionId: number, reaction: Partial<Reaction> }, { rejectWithValue }) => {
        try {
            return await updateReactionService(reactionId, reaction);
        }
        catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
)


export const deleteReactionThunk = createAsyncThunk(
    "/reactions/delete",
    async (ReactionId: number, { rejectWithValue }) => {
        try {
            return await deleteReactionService(ReactionId);
        }
        catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
)
