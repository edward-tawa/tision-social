import { createAsyncThunk } from "@reduxjs/toolkit";
import {
    getConnectionRequestService,
    createConnectionRequestService,
    getConnectionRequestsService,
    updateConnectionRequestService,
    deleteConnectionRequestService
} from "@/app/data/connection/services";
import { ConnectionRequest } from "@/app/data/connection/types";




export const getConnectionRequestThunk = createAsyncThunk(
    "/connection",
    async (connectionRequestId: number, { rejectWithValue }) => {
        try {
            return await getConnectionRequestService(connectionRequestId);
        }
        catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
)

export const getConnectionRequestsThunk = createAsyncThunk(
    "/connection/all",
    async (userId: number, { rejectWithValue }) => {
        try {
            return await getConnectionRequestsService(userId);
        }
        catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)


export const createConnectionRequestThunk = createAsyncThunk(
    "/connection/add",
    async (connectionRequest: ConnectionRequest, { rejectWithValue }) => {
        try {
            return await createConnectionRequestService(connectionRequest);
        }
        catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
)

export const updateConnectionRequestThunk = createAsyncThunk(
    "/connection/update",
    async ({ connectionRequestId, connectionRequest }: { connectionRequestId: number, connectionRequest: Partial<ConnectionRequest> }, { rejectWithValue }) => {
        try {
            return await updateConnectionRequestService(connectionRequestId, connectionRequest);
        }
        catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
)


export const deleteConnectionRequestThunk = createAsyncThunk(
    "/connection/delete",
    async (connectionRequestId: number, { rejectWithValue }) => {
        try {
            return await deleteConnectionRequestService(connectionRequestId);
        }
        catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
)
