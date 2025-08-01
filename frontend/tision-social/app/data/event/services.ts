import { getEvent, createEvent, updateEvent, deleteEvent, getEvents } from "@/app/data/event/api";
import { EventInterface } from "@/app/data/event/types";


export const getEventService = async (eventId: number) => {
    return await getEvent(eventId);
}

export const getEventsService = async (userId: number) => {
    return await getEvents(userId);
}

export const createEventService = async (event: EventInterface) => {
    return await createEvent(event);
}

export const updateEventService = async (eventId: number, event: Partial<EventInterface>) => {
    return await updateEvent(eventId, event);
}

export const deleteEventService = async (eventId: number) => {
    return await deleteEvent(eventId);
}