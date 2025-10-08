import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ConnectionRequest } from "@/app/data/connection/types";
import {
    getConnectionRequestThunk,
    getConnectionRequestsThunk,
    createConnectionRequestThunk,
    updateConnectionRequestThunk,
    deleteConnectionRequestThunk,
} from "@/app/data/connection/thunk";


interface NormalizedState {
    byId: Record<number, ConnectionRequest>;
    connectionIds: number[];
}

interface ConnectionRequests {
    connection: ConnectionRequest;
    connections: NormalizedState;
    loading: boolean;
    error?: string;
}



const initialConnection: ConnectionRequest = {
    id: Date.now(),
    sender: Date.now(),
    receiver: Date.now(),
    senderName: '',
    receiverName: '',
    status: "pending",
    timestamp: "",
}

const initialState: ConnectionRequests = {
    connection: initialConnection,
    connections: {
        byId: {},
        connectionIds: [],
    },
    loading: false,
    error: undefined,
}

const connectionSlice = createSlice({
    name: "connectionslice",
    initialState,
    reducers: {
        setConnection: (state, action: PayloadAction<ConnectionRequest>) => {
            state.connection = action.payload;
        },
        addConnection: (state, action: PayloadAction<ConnectionRequest>) => {
            const connectionId = action.payload.id;
            if (!state.connections.byId[connectionId]) {
                state.connections.byId[connectionId] = action.payload;
                state.connections.connectionIds.push(connectionId);
            }
        },

        addConnections: (state, action: PayloadAction<ConnectionRequest[]>) => {
            action.payload.forEach((connection) => {
                const connectionId = connection.id
                //if the connection already exists skip adding it.
                if (state.connections.byId[connectionId]) return

                state.connections.byId[connectionId] = connection;
                state.connections.connectionIds.push(connectionId);

            })
        },


        updateConnection: (state, action: PayloadAction<ConnectionRequest>) => {
            const connectionId = action.payload.id;
            if (state.connections.byId[connectionId]) {
                state.connections.byId[connectionId] = action.payload;
            }
        },

        deleteConnection: (state, action: PayloadAction<number>) => {
            if (state.connections.connectionIds.includes(action.payload)) {
                delete state.connections.byId[action.payload];
                state.connections.connectionIds = state.connections.connectionIds.filter(id => id !== action.payload);
            }
        },
        resetConnection: (state) => {
            state.connection = initialConnection;
            state.connections = {
                byId: {},
                connectionIds: [],
            };
        }
    },
    extraReducers: (builder) => {
        builder

            // GET ONE
            .addCase(getConnectionRequestThunk.pending, (state) => {
                state.loading = true;
                state.error = undefined;
            })
            .addCase(getConnectionRequestThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.connection = action.payload;
            })
            .addCase(getConnectionRequestThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // GET ALL
            .addCase(getConnectionRequestsThunk.pending, (state) => {
                state.loading = true;
                state.error = undefined;
            })
            .addCase(getConnectionRequestsThunk.fulfilled, (state, action) => {
                state.loading = false;
                const normalized = {
                    byId: {} as Record<number, ConnectionRequest>,
                    connectionIds: [] as number[],
                };
                action.payload.forEach((conn: ConnectionRequest) => {
                    normalized.byId[conn.id] = conn;
                    normalized.connectionIds.push(conn.id);
                });
                state.connections = normalized;
            })
            .addCase(getConnectionRequestsThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // CREATE
            .addCase(createConnectionRequestThunk.pending, (state) => {
                state.loading = true;
                state.error = undefined;
            })
            .addCase(createConnectionRequestThunk.fulfilled, (state, action) => {
                state.loading = false;
                const connection = action.payload;
                if (!state.connections.byId[connection.id]) {
                    state.connections.byId[connection.id] = connection;
                    state.connections.connectionIds.push(connection.id);
                }
            })
            .addCase(createConnectionRequestThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // UPDATE
            .addCase(updateConnectionRequestThunk.pending, (state) => {
                state.loading = true;
                state.error = undefined;
            })
            .addCase(updateConnectionRequestThunk.fulfilled, (state, action) => {
                state.loading = false;
                const updated = action.payload;
                if (state.connections.byId[updated.id]) {
                    state.connections.byId[updated.id] = updated;
                }
            })
            .addCase(updateConnectionRequestThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // DELETE
            .addCase(deleteConnectionRequestThunk.pending, (state) => {
                state.loading = true;
                state.error = undefined;
            })
            .addCase(deleteConnectionRequestThunk.fulfilled, (state, action) => {
                state.loading = false;
                const id = action.payload;
                if (state.connections.byId[id]) {
                    delete state.connections.byId[id];
                    state.connections.connectionIds = state.connections.connectionIds.filter(cid => cid !== id);
                }
            })
            .addCase(deleteConnectionRequestThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
})

export const {
    setConnection,
    addConnection,
    deleteConnection,
    updateConnection,
} = connectionSlice.actions;
export default connectionSlice.reducer;



