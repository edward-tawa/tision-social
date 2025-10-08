import { createAsyncThunk } from "@reduxjs/toolkit";
import { getInterestService, createInterestService, getInterestsService, updateInterestService, deleteInterestService } from "@/app/data/profile/interest/services";
import { InterestInterface } from "@/app/data/profile/interest/types";



export const getInterestThunk = createAsyncThunk(
    "/profile/interest",
    async (interestId: number, { rejectWithValue }) => {
        try {
            return await getInterestService(interestId);
        }
        catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)

export const getInterestsThunk = createAsyncThunk(
    "/profile/interest/all",
    async (userId: number, { rejectWithValue }) => {
        try {
            return await getInterestsService(userId);
        }
        catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)


export const createInterestThunk = createAsyncThunk(
    "/profile/interest/add",
    async (interest: InterestInterface, { rejectWithValue }) => {
        try {
            return await createInterestService(interest);
        }
        catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)

export const updateInterestThunk = createAsyncThunk(
    "profile/interest/update",
    async ({ interestId, interest }: { interestId: number, interest: Partial<InterestInterface> }, { rejectWithValue }) => {
        try {
            return await updateInterestService(interestId, interest);
        }
        catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
)


export const deleteInterestThunk = createAsyncThunk(
    "profile/interest/delete",
    async (interestId: number, { rejectWithValue }) => {
        try {
            return await deleteInterestService(interestId);
        }
        catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
)
