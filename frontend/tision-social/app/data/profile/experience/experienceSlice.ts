import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ExperienceInterface } from "@/app/data/profile/experience/types";
import {
    getExperienceThunk,
    getExperiencesThunk,
    createExperienceThunk,
    updateExperienceThunk,
    deleteExperienceThunk,
}
    from '@/app/data/profile/experience/thunk';




interface NormalizedExperience {
    byId: Record<number, ExperienceInterface>
    exIds: number[]
}

interface NormalizedState {
    experience: ExperienceInterface;
    experiences: NormalizedExperience;
    loading: boolean;
    error?: string;
}
const initialExperience: ExperienceInterface = {
    id: 0,
    userId: 0,
    company: '',
    role: '',
    location: '',
    startDate: '',
    endDate: '',
    description: [],
    technologies: [],
}

export const initialState: NormalizedState = {
    experience: initialExperience,
    experiences: {
        byId: {},
        exIds: []
    },
    loading: false,
    error: undefined,
}

const experienceSlice = createSlice({
    name: "experienceSlice",
    initialState,
    reducers: {
        setExperience: (state, action: PayloadAction<ExperienceInterface>) => {
            state.experience = action.payload;
        },
        addExperience: (state, action: PayloadAction<ExperienceInterface>) => {
            if (!state.experiences.byId[action.payload.id]) {
                state.experiences.byId[action.payload.id] = action.payload;
                state.experiences.exIds.push(action.payload.id);
            }
        },

        addExperiences: (state, action: PayloadAction<ExperienceInterface[]>) => {
            action.payload.forEach(experience => {
                if (!state.experiences.byId[experience.id]) {
                    state.experiences.byId[experience.id] = experience;
                    state.experiences.exIds.push(experience.id);
                }
            })
        },


        updateExperience: (state, action: PayloadAction<ExperienceInterface>) => {
            if (state.experiences.byId[action.payload.id]) {
                state.experiences.byId[action.payload.id] = action.payload;
            }
        },

        deleteExperience: (state, action: PayloadAction<number>) => {
            delete state.experiences.byId[action.payload];
            state.experiences.exIds = state.experiences.exIds.filter(exId => exId !== action.payload);
        },

        resetExperienceState: (state) => {
            state.experience = initialExperience;
            state.experiences.byId = {};
            state.experiences.exIds = [];
            state.error = initialState.error;
            state.loading = initialState.loading;
        }
    },
    extraReducers: (builder) => {
        builder
            // GET SINGLE EXPERIENCE
            .addCase(getExperienceThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(getExperienceThunk.fulfilled, (state, action) => {
                const ex = action.payload;
                if (!state.experiences.byId[ex.id]) {
                    state.experiences.byId[ex.id] = ex;
                    state.experiences.exIds.push(ex.id);
                }
                state.loading = false;
            })
            .addCase(getExperienceThunk.rejected, (state, action) => {
                state.error = action.payload as string || "Error occurred while fetching experience";
                state.loading = false;
            })

            // GET ALL EXPERIENCES
            .addCase(getExperiencesThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(getExperiencesThunk.fulfilled, (state, action) => {
                action.payload.forEach(ex => {
                    if (!state.experiences.byId[ex.id]) {
                        state.experiences.byId[ex.id] = ex;
                        state.experiences.exIds.push(ex.id);
                    }
                });
                state.loading = false;
            })
            .addCase(getExperiencesThunk.rejected, (state, action) => {
                state.error = action.payload as string || "Error occurred while fetching experiences";
                state.loading = false;
            })

            // CREATE EXPERIENCE
            .addCase(createExperienceThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(createExperienceThunk.fulfilled, (state, action) => {
                const ex = action.payload;
                if (!state.experiences.byId[ex.id]) {
                    state.experiences.byId[ex.id] = ex;
                    state.experiences.exIds.push(ex.id);
                }
                state.loading = false;
            })
            .addCase(createExperienceThunk.rejected, (state, action) => {
                state.error = action.payload as string || "Error occurred while creating experience";
                state.loading = false;
            })

            // UPDATE EXPERIENCE
            .addCase(updateExperienceThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateExperienceThunk.fulfilled, (state, action) => {
                const ex = action.payload;
                if (state.experiences.byId[ex.id]) {
                    state.experiences.byId[ex.id] = ex;
                }
                state.loading = false;
            })
            .addCase(updateExperienceThunk.rejected, (state, action) => {
                state.error = action.payload as string || "Error occurred while updating experience";
                state.loading = false;
            })

            // DELETE EXPERIENCE
            .addCase(deleteExperienceThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteExperienceThunk.fulfilled, (state, action) => {
                const id = action.payload;
                delete state.experiences.byId[id];
                state.experiences.exIds = state.experiences.exIds.filter(eid => eid !== id);
                state.loading = false;
            })
            .addCase(deleteExperienceThunk.rejected, (state, action) => {
                state.error = action.payload as string || "Error occurred while deleting experience";
                state.loading = false;
            });
    }

})

export const { setExperience, addExperience, addExperiences, updateExperience, deleteExperience, resetExperienceState } = experienceSlice.actions;
export default experienceSlice.reducer;