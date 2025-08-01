import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    getEducationsThunk,
    getEducationThunk,
    createEducationThunk,
    updateEducationThunk,
    deleteEducationThunk
} from '@/app/data/profile/education/thunk';
import { EducationInterface } from "@/app/data/profile/education/types";




interface NormalizedEducation {
    byId: Record<number, EducationInterface>
    eduIds: number[]
}

interface EducationState {
    education: EducationInterface,
    educations: NormalizedEducation,
    loading: boolean,
    error?: string,
}

const initialEducation: EducationInterface = {
    id: 0,
    userId: 0,
    institution: '',
    role: '',
    location: '',
    startDate: '',
    endDate: '',
    qualifications: [],
}

export const initialState: EducationState = {
    education: initialEducation,
    educations: {
        byId: {},
        eduIds: []
    },
    loading: false,
    error: undefined
}

const educationSlice = createSlice({
    name: "educationSlice",
    initialState,
    reducers: {
        setEducation: (state, action: PayloadAction<EducationInterface>) => {
            state.education = action.payload;
        },
        addEducation: (state, action: PayloadAction<EducationInterface>) => {
            if (!state.educations.byId[action.payload.id]) {
                state.educations.byId[action.payload.id] = action.payload
                state.educations.eduIds.push(action.payload.id)
            }
        },

        addEducations: (state, action: PayloadAction<EducationInterface[]>) => {
            action.payload.forEach(education => {
                if (!state.educations.byId[education.id]) {
                    state.educations.byId[education.id] = education
                    state.educations.eduIds.push(education.id)
                }
            })
        },


        updateEducation: (state, action: PayloadAction<EducationInterface>) => {
            if (state.educations.byId[action.payload.id]) {
                state.educations.byId[action.payload.id] = action.payload
            }
        },

        deleteEducation: (state, action: PayloadAction<number>) => {
            if (state.educations.byId[action.payload]) {
                delete state.educations.byId[action.payload]
                state.educations.eduIds = state.educations.eduIds.filter(eduId => eduId !== action.payload)
            }
        },

        resetEducationState: (state) => {
            state.education = initialEducation;
            state.educations.byId = {};
            state.educations.eduIds = [];
            state.loading = false;
            state.error = undefined;
        },
    },

    extraReducers: (builder) => {
        builder
            // GET ALL
            .addCase(getEducationsThunk.pending, (state) => {
                state.loading = true;
                state.error = undefined;
            })
            .addCase(getEducationsThunk.fulfilled, (state, action) => {
                state.loading = false;
                action.payload.forEach(edu => {
                    state.educations.byId[edu.id] = edu;
                    if (!state.educations.eduIds.includes(edu.id)) {
                        state.educations.eduIds.push(edu.id);
                    }
                });
            })
            .addCase(getEducationsThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // GET ONE
            .addCase(getEducationThunk.fulfilled, (state, action) => {
                state.education = action.payload;
            })

            // CREATE
            .addCase(createEducationThunk.fulfilled, (state, action) => {
                const newEdu = action.payload;
                state.educations.byId[newEdu.id] = newEdu;
                if (!state.educations.eduIds.includes(newEdu.id)) {
                    state.educations.eduIds.push(newEdu.id);
                }
            })

            // UPDATE
            .addCase(updateEducationThunk.fulfilled, (state, action) => {
                const updated = action.payload;
                if (state.educations.byId[updated.id]) {
                    state.educations.byId[updated.id] = updated;
                }
            })

            // DELETE
            .addCase(deleteEducationThunk.fulfilled, (state, action) => {
                const deletedId = action.payload;
                delete state.educations.byId[deletedId];
                state.educations.eduIds = state.educations.eduIds.filter(id => id !== deletedId);
            });
    }
})

export const { setEducation, addEducation, addEducations, updateEducation, deleteEducation, resetEducationState } = educationSlice.actions;
export default educationSlice.reducer;