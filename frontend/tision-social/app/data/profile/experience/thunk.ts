import { createAsyncThunk } from "@reduxjs/toolkit";
import { getExperienceService, createExperienceService, getExperiencesService, updateExperienceService, deleteExperienceService } from "@/app/data/profile/experience/services";
import { ExperienceInterface } from "@/app/data/profile/experience/experienceSlice";




export const getExperienceThunk = createAsyncThunk(
    "/profile/experience",
    async (exId: number, { rejectWithValue }) => {
        try {
            return await getExperienceService(exId);
        }
        catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)

export const getExperiencesThunk = createAsyncThunk(
    "/profile/experience/all",
    async (userId: number, { rejectWithValue }) => {
        try {
            return await getExperiencesService(userId);
        }
        catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)


export const createExperienceThunk = createAsyncThunk(
    "/profiel/experience/add",
    async (experience: ExperienceInterface, { rejectWithValue }) => {
        try {
            return await createExperienceService(experience);
        }
        catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)

export const updateExperienceThunk = createAsyncThunk(
    "profile/experience/update",
    async ({ exId, experience }: { exId: number, experience: Partial<ExperienceInterface> }, { rejectWithValue }) => {
        try {
            return await updateExperienceService(exId, experience);
        }
        catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
)


export const deleteExperienceThunk = createAsyncThunk(
    "profile/experience/delete",
    async (exId: number, { rejectWithValue }) => {
        try {
            return await deleteExperienceService(exId);
        }
        catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
)
