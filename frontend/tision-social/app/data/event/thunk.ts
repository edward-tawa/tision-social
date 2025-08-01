import { createAsyncThunk } from "@reduxjs/toolkit";
import {
    getEventService,
    createEventService,
    getEventsService,
    updateEventService,
    deleteEventService
} from "@/app/data/event/services";
import { EventInterface } from "@/app/data/event/types";




export const getEventThunk = createAsyncThunk(
    "/event",
    async (eventId: number, { rejectWithValue }) => {
        try {
            return await getEventService(eventId);
        }
        catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)

export const getEventsThunk = createAsyncThunk(
    "/event/all",
    async (userId: number, { rejectWithValue }) => {
        try {
            return await getEventsService(userId);
        }
        catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)


export const createEventThunk = createAsyncThunk(
    "/event/add",
    async (event: EventInterface, { rejectWithValue }) => {
        try {
            return await createEventService(event);
        }
        catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
)

export const updateEventThunk = createAsyncThunk(
    "/event/update",
    async ({ eventId, event }: { eventId: number, event: Partial<EventInterface> }, { rejectWithValue }) => {
        try {
            return await updateEventService(eventId, event);
        }
        catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
)


export const deleteEventThunk = createAsyncThunk(
    "/event/delete",
    async (eventId: number, { rejectWithValue }) => {
        try {
            return await deleteEventService(eventId);
        }
        catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
)
