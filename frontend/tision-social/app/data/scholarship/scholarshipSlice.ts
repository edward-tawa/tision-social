import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ScholarshipInterface } from "@/app/data/scholarship/types";
import {
    getScholarshipThunk,
    getScholarshipsThunk,
    createScholarshipThunk,
    updateScholarshipThunk,
    deleteScholarshipThunk,
} from "@/app/data/scholarship/thunk";



interface NormalizedScholarships {
    byId: Record<number, ScholarshipInterface>;
    scholarshipIds: number[];
}

interface ScholarshipState {
    scholarship: ScholarshipInterface;
    scholarships: NormalizedScholarships;
    loading: boolean;
    error?: string;
}

const initialScholarship: ScholarshipInterface = {
    id: Date.now(),
    posterId: Date.now(),
    name: "",
    description: "",
    requirements: [],
    deadline: "",
    amount: 0,
    isActive: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
}

const initialState: ScholarshipState = {
    scholarship: initialScholarship,
    scholarships: {
        byId: {},
        scholarshipIds: [],
    },
    loading: false,
    error: undefined,
}


const scholarshipSlice = createSlice({
    name: "scholarshipSlice",
    initialState,
    reducers: {
        setScholarship: (state, action: PayloadAction<ScholarshipInterface>) => {
            state.scholarship = action.payload
        },

        addScholarship: (state, action: PayloadAction<ScholarshipInterface>) => {
            if (!state.scholarships.byId[action.payload.id]) {
                state.scholarships.byId[action.payload.id] = action.payload
                state.scholarships.scholarshipIds.push(action.payload.id)
            }
        },

        addScholarships: (state, action: PayloadAction<ScholarshipInterface[]>) => {
            action.payload.forEach(scholarship => {
                if (!state.scholarships.byId[scholarship.id]) {
                    state.scholarships.byId[scholarship.id] = scholarship
                    state.scholarships.scholarshipIds.push(scholarship.id)
                }
            });
        },

        updateScholarship: (state, action: PayloadAction<ScholarshipInterface>) => {
            if (state.scholarships.byId[action.payload.id]) {
                state.scholarships.byId[action.payload.id] = action.payload;
            }
        },

        deleteScholarship: (state, action: PayloadAction<number>) => {
            if (state.scholarships.byId[action.payload]) {
                delete state.scholarships.byId[action.payload];
                state.scholarships.scholarshipIds = state.scholarships.scholarshipIds.filter(scholarshipId =>
                    scholarshipId !== action.payload)
            }
        },

        resetScholarshipState: (state) => {
            state.scholarship = initialScholarship;
            state.scholarships.byId = {};
            state.scholarships.scholarshipIds = [];
        },
    },
    extraReducers: (builder) => {
        builder
            // GET SINGLE SCHOLARSHIP
            .addCase(getScholarshipThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(getScholarshipThunk.fulfilled, (state, action) => {
                const scholarship = action.payload;
                state.scholarship = scholarship;
                if (!state.scholarships.byId[scholarship.id]) {
                    state.scholarships.byId[scholarship.id] = scholarship;
                    state.scholarships.scholarshipIds.push(scholarship.id);
                }
                state.loading = false;
            })
            .addCase(getScholarshipThunk.rejected, (state, action) => {
                state.error = action.payload as string || "Error occurred while fetching scholarship";
                state.loading = false;
            })

            // GET ALL SCHOLARSHIPS
            .addCase(getScholarshipsThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(getScholarshipsThunk.fulfilled, (state, action) => {
                action.payload.forEach(scholarship => {
                    if (!state.scholarships.byId[scholarship.id]) {
                        state.scholarships.byId[scholarship.id] = scholarship;
                        state.scholarships.scholarshipIds.push(scholarship.id);
                    }
                });
                state.loading = false;
            })
            .addCase(getScholarshipsThunk.rejected, (state, action) => {
                state.error = action.payload as string || "Error occurred while fetching scholarships";
                state.loading = false;
            })

            // CREATE SCHOLARSHIP
            .addCase(createScholarshipThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(createScholarshipThunk.fulfilled, (state, action) => {
                const scholarship = action.payload;
                if (!state.scholarships.byId[scholarship.id]) {
                    state.scholarships.byId[scholarship.id] = scholarship;
                    state.scholarships.scholarshipIds.push(scholarship.id);
                }
                state.loading = false;
            })
            .addCase(createScholarshipThunk.rejected, (state, action) => {
                state.error = action.payload as string || "Error occurred while creating scholarship";
                state.loading = false;
            })

            // UPDATE SCHOLARSHIP
            .addCase(updateScholarshipThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateScholarshipThunk.fulfilled, (state, action) => {
                const scholarship = action.payload;
                if (state.scholarships.byId[scholarship.id]) {
                    state.scholarships.byId[scholarship.id] = scholarship;
                }
                if (state.scholarship?.id === scholarship.id) {
                    state.scholarship = scholarship;
                }
                state.loading = false;
            })
            .addCase(updateScholarshipThunk.rejected, (state, action) => {
                state.error = action.payload as string || "Error occurred while updating scholarship";
                state.loading = false;
            })

            // DELETE SCHOLARSHIP
            .addCase(deleteScholarshipThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteScholarshipThunk.fulfilled, (state, action) => {
                const id = action.payload;
                delete state.scholarships.byId[id];
                state.scholarships.scholarshipIds = state.scholarships.scholarshipIds.filter(sid => sid !== id);
                if (state.scholarship?.id === id) {
                    state.scholarship = initialState.scholarship;
                }
                state.loading = false;
            })
            .addCase(deleteScholarshipThunk.rejected, (state, action) => {
                state.error = action.payload as string || "Error occurred while deleting scholarship";
                state.loading = false;
            });
    }

})

export const { setScholarship, addScholarship, addScholarships, updateScholarship, deleteScholarship, resetScholarshipState } = scholarshipSlice.actions;
export default scholarshipSlice.reducer;