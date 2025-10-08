import { createAsyncThunk } from "@reduxjs/toolkit";
import { getEducationService, createEducationService, getEducationsService, updateEducationService, deleteEducationService } from "@/app/data/profile/education/services";
import { EducationInterface } from "@/app/data/profile/education/types";




export const getEducationThunk = createAsyncThunk(
    "/profile/education",
    async (eduId: number, { rejectWithValue }) => {
        try {
            return await getEducationService(eduId);
        }
        catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)

export const getEducationsThunk = createAsyncThunk(
    "/profile/education/all",
    async (userId: number, { rejectWithValue }) => {
        try {
            return await getEducationsService(userId);
        }
        catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)


export const createEducationThunk = createAsyncThunk(
    "/profiel/education/add",
    async (Education: EducationInterface, { rejectWithValue }) => {
        try {
            return await createEducationService(Education);
        }
        catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)

export const updateEducationThunk = createAsyncThunk(
    "profile/education/update",
    async ({ eduId, Education }: { eduId: number, Education: Partial<EducationInterface> }, { rejectWithValue }) => {
        try {
            return await updateEducationService(eduId, Education);
        }
        catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
)


export const deleteEducationThunk = createAsyncThunk(
    "profile/education/delete",
    async (eduId: number, { rejectWithValue }) => {
        try {
            return await deleteEducationService(eduId);
        }
        catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
)
