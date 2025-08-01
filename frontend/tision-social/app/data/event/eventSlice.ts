import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EventInterface } from "@/app/data/event/types";
import {
    getEventThunk,
    getEventsThunk,
    createEventThunk,
    updateEventThunk,
    deleteEventThunk,
} from "@/app/data/event/thunk";

export const dummyEvents = [
    {
        id: 1,
        name: "Team Sync",
        description: "Weekly team catch-up meeting",
        location: "Zoom",
        date: "2025-06-15",
        startTime: "10:00 AM",
        endTime: "11:00 AM",
    },
    {
        id: 2,
        name: "Product Demo",
        description: "Demo of new product features",
        location: "Harare",
        date: "2025-06-16",
        startTime: "2:00 PM",
        endTime: "3:00 PM",
    },
    {
        id: 3,
        name: "Client Call",
        description: "Discuss requirements with the client",
        location: "Bulawayo",
        date: "2025-06-17",
        startTime: "9:00 AM",
        endTime: "9:45 AM",
    },
    {
        id: 4,
        name: "Design Review",
        description: "Review UI/UX designs for the dashboard",
        location: "Mutare",
        date: "2025-06-18",
        startTime: "11:30 AM",
        endTime: "12:30 PM",
    },
    {
        id: 5,
        name: "Planning Session",
        description: "Sprint planning and backlog grooming",
        location: "Tision Social",
        date: "2025-06-19",
        startTime: "4:00 PM",
        endTime: "5:00 PM",
    },
];


interface NormalizedState {
    byId: Record<string, EventInterface>;
    eventIds: number[];
}

interface EventState {
    event: EventInterface;
    events: NormalizedState;
    loading: boolean;
    error?: string;
}

const initialEvent: EventInterface = {
    id: Date.now(),
    name: "",
    description: "",
    location: "",
    date: "",
    startTime: "",
    endTime: "",
}

const initialState: EventState = {
    event: initialEvent,
    events: {
        byId: {},
        eventIds: [],
    },
    loading: false,
    error: undefined,
}

const eventSlice = createSlice({
    name: "eventSlice",
    initialState,
    reducers: {
        setEvent: (state, action: PayloadAction<EventInterface>) => {
            state.event = action.payload;
        },
        addEvent: (state, action: PayloadAction<EventInterface>) => {
            if (!state.events.byId[action.payload.id]) {
                state.events.byId[action.payload.id] = action.payload;
                state.events.eventIds.push(action.payload.id);
            }
        },
        addEvents: (state, action: PayloadAction<EventInterface[]>) => {
            action.payload.forEach(event => {
                if (!state.events.byId[event.id]) {
                    state.events.byId[event.id] = event;
                    state.events.eventIds.push(event.id);
                }
            })
        },
        updateEvent: (state, action: PayloadAction<EventInterface>) => {
            if (state.events.byId[action.payload.id]) {
                state.events.byId[action.payload.id] = action.payload;

            }
            else {
                state.events.byId[action.payload.id] = action.payload;
                state.events.eventIds.push(action.payload.id);
            }
        },

        deleteEvent: (state, action: PayloadAction<number>) => {
            delete state.events.byId[action.payload];
            state.events.eventIds = state.events.eventIds.filter(id => id !== action.payload);
        },

        resetEventState: (state) => {
            state.event = initialEvent;
            state.events.byId = {};
            state.events.eventIds = [];
            state.loading = false;
            state.error = undefined;
        }

    },
    extraReducers: (builder) => {
        builder
            // GET SINGLE EVENT
            .addCase(getEventThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(getEventThunk.fulfilled, (state, action) => {
                const ev = action.payload;
                state.event = ev;
                if (!state.events.byId[ev.id]) {
                    state.events.byId[ev.id] = ev;
                    state.events.eventIds.push(ev.id);
                }
                state.loading = false;
            })
            .addCase(getEventThunk.rejected, (state, action) => {
                state.error = action.payload as string || "Error occurred while fetching event";
                state.loading = false;
            })

            // GET ALL EVENTS
            .addCase(getEventsThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(getEventsThunk.fulfilled, (state, action) => {
                action.payload.forEach(ev => {
                    if (!state.events.byId[ev.id]) {
                        state.events.byId[ev.id] = ev;
                        state.events.eventIds.push(ev.id);
                    }
                });
                state.loading = false;
            })
            .addCase(getEventsThunk.rejected, (state, action) => {
                state.error = action.payload as string || "Error occurred while fetching events";
                state.loading = false;
            })

            // CREATE EVENT
            .addCase(createEventThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(createEventThunk.fulfilled, (state, action) => {
                const ev = action.payload;
                if (!state.events.byId[ev.id]) {
                    state.events.byId[ev.id] = ev;
                    state.events.eventIds.push(ev.id);
                }
                state.loading = false;
            })
            .addCase(createEventThunk.rejected, (state, action) => {
                state.error = action.payload as string || "Error occurred while creating event";
                state.loading = false;
            })

            // UPDATE EVENT
            .addCase(updateEventThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateEventThunk.fulfilled, (state, action) => {
                const ev = action.payload;
                if (state.events.byId[ev.id]) {
                    state.events.byId[ev.id] = ev;
                }
                if (state.event?.id === ev.id) {
                    state.event = ev;
                }
                state.loading = false;
            })
            .addCase(updateEventThunk.rejected, (state, action) => {
                state.error = action.payload as string || "Error occurred while updating event";
                state.loading = false;
            })

            // DELETE EVENT
            .addCase(deleteEventThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteEventThunk.fulfilled, (state, action) => {
                const id = action.payload;
                delete state.events.byId[id];
                state.events.eventIds = state.events.eventIds.filter(eid => eid !== id);
                if (state.event?.id === id) {
                    state.event = initialState.event;
                }
                state.loading = false;
            })
            .addCase(deleteEventThunk.rejected, (state, action) => {
                state.error = action.payload as string || "Error occurred while deleting event";
                state.loading = false;
            });
    }

})


export const { setEvent, addEvent, addEvents, updateEvent, deleteEvent, resetEventState } = eventSlice.actions;
export default eventSlice.reducer;