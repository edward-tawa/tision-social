import { createAsyncThunk } from "@reduxjs/toolkit";
import { getProjectService, createProjectService, getProjectsService, updateProjectService, deleteProjectService } from "@/app/data/profile/project/services";
import { ProjectInterface } from "@/app/data/profile/project/types";




export const getProjectThunk = createAsyncThunk(
    "/profile/project",
    async (exId: number, { rejectWithValue }) => {
        try {
            return await getProjectService(exId);
        }
        catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)

export const getProjectsThunk = createAsyncThunk(
    "/profile/project/all",
    async (userId: number, { rejectWithValue }) => {
        try {
            return await getProjectsService(userId);
        }
        catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)


export const createProjectThunk = createAsyncThunk(
    "/profiel/project/add",
    async (Project: ProjectInterface, { rejectWithValue }) => {
        try {
            return await createProjectService(Project);
        }
        catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)

export const updateProjectThunk = createAsyncThunk(
    "profile/project/update",
    async ({ exId, Project }: { exId: number, Project: Partial<ProjectInterface> }, { rejectWithValue }) => {
        try {
            return await updateProjectService(exId, Project);
        }
        catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
)


export const deleteProjectThunk = createAsyncThunk(
    "profile/project/delete",
    async (exId: number, { rejectWithValue }) => {
        try {
            return await deleteProjectService(exId);
        }
        catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
)
