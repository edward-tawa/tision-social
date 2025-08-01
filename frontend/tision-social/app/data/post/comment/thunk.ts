import { createAsyncThunk } from "@reduxjs/toolkit";
import {
    getCommentService,
    createCommentService,
    getCommentsService,
    updateCommentService,
    deleteCommentService
} from "@/app/data/post/comment/services";
import { CommentInterface } from "@/app/data/post/comment/types";




export const getCommentThunk = createAsyncThunk(
    "/comments/comment",
    async (commentId: number, { rejectWithValue }) => {
        try {
            return await getCommentService(commentId);
        }
        catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)

export const getCommentsThunk = createAsyncThunk(
    "/comments/all",
    async (userId: number, { rejectWithValue }) => {
        try {
            return await getCommentsService(userId);
        }
        catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)


export const createCommentThunk = createAsyncThunk(
    "/comments/add",
    async (comment: CommentInterface, { rejectWithValue }) => {
        try {
            return await createCommentService(comment);
        }
        catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
)

export const updateCommentThunk = createAsyncThunk(
    "/comments/update",
    async ({ commentId, comment }: { commentId: number, comment: Partial<CommentInterface> }, { rejectWithValue }) => {
        try {
            return await updateCommentService(commentId, comment);
        }
        catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
)


export const deleteCommentThunk = createAsyncThunk(
    "/comments/delete",
    async (commentId: number, { rejectWithValue }) => {
        try {
            return await deleteCommentService(commentId);
        }
        catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
)
