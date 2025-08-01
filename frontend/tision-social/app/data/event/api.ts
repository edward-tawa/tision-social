//api.ts
import { EventInterface } from "@/app/data/event/types";
import api from "@/app/data/utils/axios";
import { eventEndPoints } from "@/app/data/event/endpoints";

export const createEvent = async (event: EventInterface): Promise<EventInterface> => {
    try {
        const res = await api.post(eventEndPoints.createevent, event);
        return res.data;
    }

    catch (error: any) {
        throw new Error(error.message || "An error occurred while creating the Event");
    }
}

export const getEvent = async (eventId: number): Promise<EventInterface> => {
    try {
        const res = await api.get(eventEndPoints.getevent(eventId));
        return res.data;
    }
    catch (error: any) {
        throw new Error(error.message || "Error while fetching Event");
    }
}

export const getEvents = async (userId: number): Promise<EventInterface[]> => {
    try {
        const res = await api.get(eventEndPoints.getevents(userId));
        return res.data;
    }
    catch (error: any) {
        throw new Error(error.message || "Error while fetching Events");
    }
}

export const updateEvent = async (eventId: number, event: Partial<EventInterface>): Promise<EventInterface> => {
    try {
        const res = await api.patch(eventEndPoints.updateevent(eventId), event)
        return res.data
    }
    catch (error: any) {
        throw new Error(error.message || "Error while updating Event");
    }
}


export const deleteEvent = async (eventId: number): Promise<number> => {
    try {
        const res = await api.delete(eventEndPoints.deleteevent(eventId));
        return res.data;
    }
    catch (error: any) {
        throw new Error(error.message || "Error while deleting Event");
    }
}
