//Thunks for user management

import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserInterface } from "@/app/data/user/types"
import { createUserService, getUsersService } from "@/app/data/user/services"
import { getUserService } from "@/app/data/user/services"
import { updateUserService } from "@/app/data/user/services"
import { deleteUserService } from "@/app/data/user/services"


export const createUserThunk = createAsyncThunk(
    "/user/createUser",
    async (userData: UserInterface, { rejectWithValue }) => {
        try {
            const response = await createUserService(userData);
            return response;
        }
        catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
)

export const getUserThunk = createAsyncThunk(
    "/user/getUser",
    async (userId: number, { rejectWithValue }) => {
        try {
            const response = await getUserService(userId);
            return response;
        }
        catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
)

export const getUsersThunk = createAsyncThunk(
    "user/getusers",
    async ({ page, pageSize }: { page: number, pageSize: number }, { rejectWithValue }) => {
        try {
            const response = await getUsersService(page, pageSize);
            return response;
        }
        catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
)

export const updateUserThunk = createAsyncThunk(
    "/user/updateUser",
    async ({ userId, userData }: { userId: number, userData: Partial<UserInterface> }, { rejectWithValue }) => {
        try {
            const response = await updateUserService(userId, userData);
            return response;
        }

        catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
)

export const deleteUserThunk = createAsyncThunk(
    "user/deleteUser",
    async (userId: number, { rejectWithValue }) => {
        try {
            const response = await deleteUserService(userId);
            return response;
        }
        catch (error: any) {
            return rejectWithValue(error.messsage);
        }
    }
)