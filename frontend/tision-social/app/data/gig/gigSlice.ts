import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GigInterface } from "@/app/data/gig/types";
import {
    getGigThunk,
    getGigsThunk,
    createGigThunk,
    updateGigThunk,
    deleteGigThunk,
} from "@/app/data/gig/thunk";



interface NormalizedGigs {
    byId: Record<number, GigInterface>,
    gigIds: number[]
}

interface GigInitialState {
    gig: GigInterface;
    gigs: NormalizedGigs;
    loading: boolean;
    error?: string;
}

const initialState: GigInitialState = {
    gig: {
        id: Date.now(),
        title: "",
        location: "",
        category: "",
        datePosted: "",
        expiryDate: "",
        duration: "",
    },
    gigs: {
        byId: {},
        gigIds: []
    },
    loading: false,
    error: undefined,
}

const gigSlice = createSlice({
    name: "gigSlice",
    initialState,
    reducers: {
        setGig: (state, action: PayloadAction<GigInterface>) => {
            state.gig = action.payload;
        },

        addGig: (state, action: PayloadAction<GigInterface>) => {
            const gigId = action.payload.id;
            const exists = state.gigs.gigIds.includes(gigId);
            if (!exists) {
                state.gigs.byId[gigId] = action.payload;
                state.gigs.gigIds.push(gigId);
            }
        },
        updateGig: (state, action: PayloadAction<GigInterface>) => {
            const gigId = action.payload.id;
            if (state.gigs.byId[gigId]) {
                state.gigs.byId[gigId] = action.payload;
            }
        },

        deleteGig: (state, action: PayloadAction<number>) => {
            const exists = state.gigs.gigIds.includes(action.payload);
            if (exists) {
                delete state.gigs.byId[action.payload]
                state.gigs.gigIds = state.gigs.gigIds.filter(gigId => gigId !== action.payload)
            }
        },

        addGigs: (state, action: PayloadAction<GigInterface[]>) => {
            action.payload.forEach(gig => {
                if (!state.gigs.gigIds.includes(gig.id)) {
                    state.gigs.byId[gig.id] = gig;
                    state.gigs.gigIds.push(gig.id);
                }
            })
        },

        resetGig: (state) => {
            state.gig = {
                id: Date.now(),
                title: "",
                category: "",
                location: "",
                datePosted: "",
                expiryDate: "",
                duration: "",
            };
            state.gigs = {
                byId: {},
                gigIds: []
            };
        },
    },
    extraReducers: (builder) => {
        builder
            // GET SINGLE GIG
            .addCase(getGigThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(getGigThunk.fulfilled, (state, action) => {
                const gig = action.payload;
                state.gig = gig;
                if (!state.gigs.byId[gig.id]) {
                    state.gigs.byId[gig.id] = gig;
                    state.gigs.gigIds.push(gig.id);
                }
                state.loading = false;
            })
            .addCase(getGigThunk.rejected, (state, action) => {
                state.error = action.payload as string || "Error occurred while fetching gig";
                state.loading = false;
            })

            // GET ALL GIGS
            .addCase(getGigsThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(getGigsThunk.fulfilled, (state, action) => {
                action.payload.forEach(gig => {
                    if (!state.gigs.byId[gig.id]) {
                        state.gigs.byId[gig.id] = gig;
                        state.gigs.gigIds.push(gig.id);
                    }
                });
                state.loading = false;
            })
            .addCase(getGigsThunk.rejected, (state, action) => {
                state.error = action.payload as string || "Error occurred while fetching gigs";
                state.loading = false;
            })

            // CREATE GIG
            .addCase(createGigThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(createGigThunk.fulfilled, (state, action) => {
                const gig = action.payload;
                if (!state.gigs.byId[gig.id]) {
                    state.gigs.byId[gig.id] = gig;
                    state.gigs.gigIds.push(gig.id);
                }
                state.loading = false;
            })
            .addCase(createGigThunk.rejected, (state, action) => {
                state.error = action.payload as string || "Error occurred while creating gig";
                state.loading = false;
            })

            // UPDATE GIG
            .addCase(updateGigThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateGigThunk.fulfilled, (state, action) => {
                const gig = action.payload;
                if (state.gigs.byId[gig.id]) {
                    state.gigs.byId[gig.id] = gig;
                }
                if (state.gig?.id === gig.id) {
                    state.gig = gig;
                }
                state.loading = false;
            })
            .addCase(updateGigThunk.rejected, (state, action) => {
                state.error = action.payload as string || "Error occurred while updating gig";
                state.loading = false;
            })

            // DELETE GIG
            .addCase(deleteGigThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteGigThunk.fulfilled, (state, action) => {
                const id = action.payload;
                delete state.gigs.byId[id];
                state.gigs.gigIds = state.gigs.gigIds.filter(gid => gid !== id);
                if (state.gig?.id === id) {
                    state.gig = initialState.gig;
                }
                state.loading = false;
            })
            .addCase(deleteGigThunk.rejected, (state, action) => {
                state.error = action.payload as string || "Error occurred while deleting gig";
                state.loading = false;
            });
    }

})


export const {
    setGig,
    addGig,
    updateGig,
    deleteGig,
    addGigs,
    resetGig
} = gigSlice.actions;
export default gigSlice.reducer;


