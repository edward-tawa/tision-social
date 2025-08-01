import { createAsyncThunk } from "@reduxjs/toolkit";
import {
    getGigService,
    createGigService,
    getGigsService,
    updateGigService,
    deleteGigService
} from "@/app/data/gig/services";
import { GigInterface } from "@/app/data/gig/types";




export const getGigThunk = createAsyncThunk(
    "/gig",
    async (gigId: number, { rejectWithValue }) => {
        try {
            return await getGigService(gigId);
        }
        catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)

export const getGigsThunk = createAsyncThunk(
    "/gig/all",
    async (userId: number, { rejectWithValue }) => {
        try {
            return await getGigsService(userId);
        }
        catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)


export const createGigThunk = createAsyncThunk(
    "/gig/add",
    async (gig: GigInterface, { rejectWithValue }) => {
        try {
            return await createGigService(gig);
        }
        catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
)

export const updateGigThunk = createAsyncThunk(
    "/gig/update",
    async ({ gigId, gig }: { gigId: number, gig: Partial<GigInterface> }, { rejectWithValue }) => {
        try {
            return await updateGigService(gigId, gig);
        }
        catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
)


export const deleteGigThunk = createAsyncThunk(
    "/gig/delete",
    async (gigId: number, { rejectWithValue }) => {
        try {
            return await deleteGigService(gigId);
        }
        catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
)
