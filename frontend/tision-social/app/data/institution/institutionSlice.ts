import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InstitutionInterface } from "@/app/data/institution/types";
import { getInstitutionThunk, getInstitutionsThunk, createInstitutionThunk, updateInstitutionThunk, deleteInstitutionThunk } from "@/app/data/institution/thunk";


interface NormalizedState {
    byId: Record<number, InstitutionInterface>;
    institutionIds: number[];
}

interface institutionState {
    institution: InstitutionInterface;
    institutions: NormalizedState;
    loading: boolean;
    error?: string;
}

const initialState: institutionState = {
    institution: {
        id: 0,
        name: "",
        description: "",
        location: "",
        offers: [],
        logoUrl: "",
        websiteUrl: "",
        address: "",
        phone: "",
        email: "",
        createdAt: new Date(),
        updatedAt: new Date(),
        isActive: false,
        verified: false,
    },
    institutions: {
        byId: {},
        institutionIds: [],
    },
    loading: false,
    error: undefined,

}

const institutionSlice = createSlice({
    name: "institutionSlice",
    initialState,
    reducers: {
        setInstitution: (state, action: PayloadAction<InstitutionInterface>) => {
            state.institution = action.payload;
        },
        addInstitution: (state, action: PayloadAction<InstitutionInterface>) => {
            const institution = action.payload;
            if (!state.institutions.byId[institution.id]) {
                state.institutions.byId[institution.id] = institution;
                state.institutions.institutionIds.push(institution.id);
            }
        },
        addInstitutions: (state, action: PayloadAction<InstitutionInterface[]>) => {
            action.payload.forEach(institution => {
                if (!state.institutions.byId[institution.id]) {
                    state.institutions.byId[institution.id] = institution;
                    state.institutions.institutionIds.push(institution.id);
                }
            });
        },
        updateInstitution: (state, action: PayloadAction<InstitutionInterface>) => {
            const updatedInstitution = action.payload;
            if (state.institutions.byId[updatedInstitution.id]) {
                state.institutions.byId[updatedInstitution.id] = updatedInstitution;
            } else {
                state.institutions.byId[updatedInstitution.id] = updatedInstitution;
                state.institutions.institutionIds.push(updatedInstitution.id);
            }
        },
        deleteInstitution: (state, action: PayloadAction<number>) => {
            if (state.institutions.byId[action.payload]) {
                delete state.institutions.byId[action.payload]
                state.institutions.institutionIds = state.institutions.institutionIds.filter(id => id !== action.payload);
            }
        },
        resetInstitutionState: (state) => {
            state.institution = initialState.institution;
            state.institutions.byId = {};
            state.institutions.institutionIds = [];
            state.loading = false;
            state.error = undefined;
        }
    },
    extraReducers: (builder) => {
        builder
            // GET SINGLE INSTITUTION
            .addCase(getInstitutionThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(getInstitutionThunk.fulfilled, (state, action) => {
                const inst = action.payload;
                state.institution = inst;
                if (!state.institutions.byId[inst.id]) {
                    state.institutions.byId[inst.id] = inst;
                    state.institutions.institutionIds.push(inst.id);
                }
                state.loading = false;
            })
            .addCase(getInstitutionThunk.rejected, (state, action) => {
                state.error = action.payload as string || "Error occurred while fetching institution";
                state.loading = false;
            })

            // GET ALL INSTITUTIONS
            .addCase(getInstitutionsThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(getInstitutionsThunk.fulfilled, (state, action) => {
                action.payload.forEach(inst => {
                    if (!state.institutions.byId[inst.id]) {
                        state.institutions.byId[inst.id] = inst;
                        state.institutions.institutionIds.push(inst.id);
                    }
                });
                state.loading = false;
            })
            .addCase(getInstitutionsThunk.rejected, (state, action) => {
                state.error = action.payload as string || "Error occurred while fetching institutions";
                state.loading = false;
            })

            // CREATE INSTITUTION
            .addCase(createInstitutionThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(createInstitutionThunk.fulfilled, (state, action) => {
                const inst = action.payload;
                if (!state.institutions.byId[inst.id]) {
                    state.institutions.byId[inst.id] = inst;
                    state.institutions.institutionIds.push(inst.id);
                }
                state.loading = false;
            })
            .addCase(createInstitutionThunk.rejected, (state, action) => {
                state.error = action.payload as string || "Error occurred while creating institution";
                state.loading = false;
            })

            // UPDATE INSTITUTION
            .addCase(updateInstitutionThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateInstitutionThunk.fulfilled, (state, action) => {
                const inst = action.payload;
                if (state.institutions.byId[inst.id]) {
                    state.institutions.byId[inst.id] = inst;
                }
                if (state.institution?.id === inst.id) {
                    state.institution = inst;
                }
                state.loading = false;
            })
            .addCase(updateInstitutionThunk.rejected, (state, action) => {
                state.error = action.payload as string || "Error occurred while updating institution";
                state.loading = false;
            })

            // DELETE INSTITUTION
            .addCase(deleteInstitutionThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteInstitutionThunk.fulfilled, (state, action) => {
                const id = action.payload;
                delete state.institutions.byId[id];
                state.institutions.institutionIds = state.institutions.institutionIds.filter(instId => instId !== id);
                if (state.institution?.id === id) {
                    state.institution = initialState.institution;
                }
                state.loading = false;
            })
            .addCase(deleteInstitutionThunk.rejected, (state, action) => {
                state.error = action.payload as string || "Error occurred while deleting institution";
                state.loading = false;
            });
    }





})

export const { setInstitution, addInstitution, addInstitutions, updateInstitution, deleteInstitution, resetInstitutionState } = institutionSlice.actions;
export default institutionSlice.reducer;
