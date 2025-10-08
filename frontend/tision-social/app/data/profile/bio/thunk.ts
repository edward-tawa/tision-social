import { createAsyncThunk } from "@reduxjs/toolkit";
import { getBioService, createBioService, updateBioService, deleteBioService } from "@/app/data/profile/bio/services";
import { BioInterface } from "@/app/data/profile/bio/types";


export const getBioThunk = createAsyncThunk(
    "/profile/bio",
    async (userId: number, { rejectWithValue }) => {
        try {
            return await getBioService(userId);
        }
        catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
)

export const createBioThunk = createAsyncThunk(
    "/profile/bio/create",
    async (userBio: BioInterface, { rejectWithValue }) => {
        try {
            return await createBioService(userBio);
        }
        catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
)

export const updateBioThunk = createAsyncThunk(
    "/profile/bio/update",
    async ({ bioId, userBio }: { bioId: number, userBio: Partial<BioInterface> }, { rejectWithValue }) => {
        try {
            return await updateBioService(bioId, userBio);
        }
        catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
)

export const deleteBioThunk = createAsyncThunk(
    "/profile/bio/delete",
    async (userId: number, { rejectWithValue }) => {
        try {
            return await deleteBioService(userId);
        }
        catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
)