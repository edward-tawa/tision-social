import { createAsyncThunk } from "@reduxjs/toolkit";
import {
    getPostService,
    createPostService,
    getPostsService,
    updatePostService,
    deletePostService
} from "@/app/data/post/services";
import { Post } from "@/app/data/post/types";




export const getPostThunk = createAsyncThunk(
    "/post",
    async (postId: number, { rejectWithValue }) => {
        try {
            return await getPostService(postId);
        }
        catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
)

export const getPostsThunk = createAsyncThunk(
    "/post/all",
    async ({ userId, cursor, limit }: { userId: number, cursor: number | null, limit: number }, { rejectWithValue }) => {
        try {
            return await getPostsService(userId, cursor, limit);
        }
        catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
)


export const createPostThunk = createAsyncThunk(
    "/post/add",
    async (post: Post, { rejectWithValue }) => {
        try {
            return await createPostService(post);
        }
        catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
)

export const updatePostThunk = createAsyncThunk(
    "/post/update",
    async ({ postId, post }: { postId: number, post: Partial<Post> }, { rejectWithValue }) => {
        try {
            return await updatePostService(postId, post);
        }
        catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
)


export const deletePostThunk = createAsyncThunk(
    "/post/delete",
    async (postId: number, { rejectWithValue }) => {
        try {
            return await deletePostService(postId);
        }
        catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
)
