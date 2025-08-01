import { createAsyncThunk } from "@reduxjs/toolkit";
import {
    getScholarshipService,
    createScholarshipService,
    getScholarshipsService,
    updateScholarshipService,
    deleteScholarshipService
} from "@/app/data/scholarship/services";
import { ScholarshipInterface } from "@/app/data/scholarship/types";




export const getScholarshipThunk = createAsyncThunk(
    "/scholarship",
    async (scholarshipId: number, { rejectWithValue }) => {
        try {
            return await getScholarshipService(scholarshipId);
        }
        catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)

export const getScholarshipsThunk = createAsyncThunk(
    "/scholarship/all",
    async (userId: number, { rejectWithValue }) => {
        try {
            return await getScholarshipsService(userId);
        }
        catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)


export const createScholarshipThunk = createAsyncThunk(
    "/scholarship/add",
    async (scholarship: ScholarshipInterface, { rejectWithValue }) => {
        try {
            return await createScholarshipService(scholarship);
        }
        catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
)

export const updateScholarshipThunk = createAsyncThunk(
    "/scholarship/update",
    async ({ scholarshipId, scholarship }: { scholarshipId: number, scholarship: Partial<ScholarshipInterface> }, { rejectWithValue }) => {
        try {
            return await updateScholarshipService(scholarshipId, scholarship);
        }
        catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
)


export const deleteScholarshipThunk = createAsyncThunk(
    "/scholarship/delete",
    async (scholarshipId: number, { rejectWithValue }) => {
        try {
            return await deleteScholarshipService(scholarshipId);
        }
        catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
)
