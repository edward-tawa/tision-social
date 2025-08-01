import { createAsyncThunk } from "@reduxjs/toolkit";
import {
    getJobService,
    createJobService,
    getJobsService,
    updateJobService,
    deleteJobService
} from "@/app/data/job/services";
import { JobInterface } from "@/app/data/job/types";




export const getJobThunk = createAsyncThunk(
    "/job",
    async (jobId: number, { rejectWithValue }) => {
        try {
            return await getJobService(jobId);
        }
        catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)

export const getJobsThunk = createAsyncThunk(
    "/job/all",
    async (userId: number, { rejectWithValue }) => {
        try {
            return await getJobsService(userId);
        }
        catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)


export const createJobThunk = createAsyncThunk(
    "/job/add",
    async (job: JobInterface, { rejectWithValue }) => {
        try {
            return await createJobService(job);
        }
        catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
)

export const updateJobThunk = createAsyncThunk(
    "/job/update",
    async ({ jobId, job }: { jobId: number, job: Partial<JobInterface> }, { rejectWithValue }) => {
        try {
            return await updateJobService(jobId, job);
        }
        catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
)


export const deleteJobThunk = createAsyncThunk(
    "/job/delete",
    async (jobId: number, { rejectWithValue }) => {
        try {
            return await deleteJobService(jobId);
        }
        catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
)
