import { createAsyncThunk } from "@reduxjs/toolkit";
import { getInstitutionService, createInstitutionService, getInstitutionsService, updateInstitutionService, deleteInstitutionService } from "@/app/data/institution/services";
import { InstitutionInterface } from "@/app/data/institution/types";




export const getInstitutionThunk = createAsyncThunk(
    "/institution",
    async (institutionId: number, { rejectWithValue }) => {
        try {
            return await getInstitutionService(institutionId);
        }
        catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
)

export const getInstitutionsThunk = createAsyncThunk(
    "/institution/all",
    async (userId: number, { rejectWithValue }) => {
        try {
            return await getInstitutionsService(userId);
        }
        catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)


export const createInstitutionThunk = createAsyncThunk(
    "/institution/add",
    async (institution: InstitutionInterface, { rejectWithValue }) => {
        try {
            return await createInstitutionService(institution);
        }
        catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
)

export const updateInstitutionThunk = createAsyncThunk(
    "/institution/update",
    async ({ institutionId, institution }: { institutionId: number, institution: Partial<InstitutionInterface> }, { rejectWithValue }) => {
        try {
            return await updateInstitutionService(institutionId, institution);
        }
        catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
)


export const deleteInstitutionThunk = createAsyncThunk(
    "/institution/delete",
    async (institutionId: number, { rejectWithValue }) => {
        try {
            return await deleteInstitutionService(institutionId);
        }
        catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
)
