import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InterestInterface } from "@/app/data/profile/interest/types";
import {
    getInterestsThunk,
    getInterestThunk,
    createInterestThunk,
    updateInterestThunk,
    deleteInterestThunk,
} from '@/app/data/profile/interest/thunk';


interface NormalizedInterest {
    byId: Record<number, InterestInterface>,
    interestIds: number[]
}

interface InterestState {
    interest: InterestInterface,
    interests: NormalizedInterest,
    loading: boolean,
    error?: string,
}

export const initialState: InterestState = {
    interest: {
        id: 0,
        userId: 0,
        name: "",
    },
    interests: {
        byId: {},
        interestIds: []
    },
    loading: false,
    error: undefined,
}

const interestSlice = createSlice({
    name: "interestSlice",
    initialState,
    reducers: {
        setInterest: (state, action: PayloadAction<InterestInterface>) => {
            state.interest = action.payload;
        },

        addInterest: (state, action: PayloadAction<InterestInterface>) => {
            if (!state.interests.byId[action.payload.id]) {
                state.interests.byId[action.payload.id] = action.payload
                state.interests.interestIds.push(action.payload.id)
            }
        },

        addInterests: (state, action: PayloadAction<InterestInterface[]>) => {
            action.payload.forEach(interest => {
                if (!state.interests.byId[interest.id]) {
                    state.interests.byId[interest.id] = interest;
                    state.interests.interestIds.push(interest.id);
                }
            })
        },

        updateInterest: (state, action: PayloadAction<InterestInterface>) => {
            if (state.interests.byId[action.payload.id] && state.interests.interestIds.includes(action.payload.id)) {
                state.interests.byId[action.payload.id] = action.payload;
            }
        },

        deleteInterest: (state, action: PayloadAction<number>) => {
            if (state.interests.byId[action.payload]) {
                delete state.interests.byId[action.payload]
                state.interests.interestIds = state.interests.interestIds.filter(id => id !== action.payload);

            }
        },

        resetInterestState: (state) => {
            state.interest = initialState.interest
            state.interests.byId = {}
            state.interests.interestIds = []
            state.loading = false
            state.error = undefined
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(getInterestsThunk.pending, (state) => {
                state.loading = true;
                state.error = undefined;
            })
            .addCase(getInterestsThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.error = undefined;
                state.interests.byId = {};
                state.interests.interestIds = [];
                action.payload.forEach((interest: InterestInterface) => {
                    state.interests.byId[interest.id] = interest;
                    state.interests.interestIds.push(interest.id);
                });
            })
            .addCase(getInterestsThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string || action.error.message;
            })

            .addCase(getInterestThunk.fulfilled, (state, action) => {
                state.interest = action.payload;
            })

            .addCase(createInterestThunk.pending, (state) => {
                state.loading = true;
                state.error = undefined;
            })
            .addCase(createInterestThunk.fulfilled, (state, action) => {
                state.loading = false;
                const newInterest = action.payload;
                state.interests.byId[newInterest.id] = newInterest;
                if (!state.interests.interestIds.includes(newInterest.id)) {
                    state.interests.interestIds.push(newInterest.id);
                }
            })
            .addCase(createInterestThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string || action.error.message;
            })

            .addCase(updateInterestThunk.fulfilled, (state, action) => {
                const updated = action.payload;
                state.interests.byId[updated.id] = updated;
            })

            .addCase(deleteInterestThunk.fulfilled, (state, action) => {
                const id = action.payload;
                delete state.interests.byId[id];
                state.interests.interestIds = state.interests.interestIds.filter(
                    (existingId) => existingId !== id
                );
            });
    },
});



export const { setInterest, addInterest, addInterests, updateInterest, deleteInterest, resetInterestState } = interestSlice.actions
export default interestSlice.reducer