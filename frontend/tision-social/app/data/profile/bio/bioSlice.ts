import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getBioThunk, createBioThunk, updateBioThunk, deleteBioThunk } from "@/app/data/profile/bio/thunk";
import { BioInterface } from "@/app/data/profile/bio/types";




interface BioState {
    bio: BioInterface,
    bios: BioInterface[],
    loading: boolean,
    error?: string
}

export const initialState: BioState = {
    bio: {
        id: 0,
        userId: 0,
        name: "",
        location: "",
        email: "",
        description: "",
        website: "",
        employmentStatus: [],
    },

    bios: [],
    loading: false,
    error: undefined,
}


const bioSlice = createSlice({
    name: "bioSlice",
    initialState,
    reducers: {
        setBio: (state, action: PayloadAction<BioInterface>) => {
            state.bio = action.payload
        },

        addBio: (state, action: PayloadAction<BioInterface>) => {
            const exits = state.bios.some(bio => bio.id === action.payload.id)
            if (!exits) {
                state.bios.push(action.payload)
            }
        },
        updateBio: (state, action: PayloadAction<BioInterface>) => {
            const index = state.bios.findIndex(bio => bio.id === action.payload.id)

            if (index !== -1) {
                state.bios[index] = action.payload
            }
        },

        deleteBio: (state, action: PayloadAction<number>) => {
            state.bios = state.bios.filter(bio => bio.id !== action.payload)
        },

        resetBioState: (state) => {
            state.bio = initialState.bio;
            state.bios = initialState.bios;
            state.loading = initialState.loading;
            state.error = initialState.error;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getBioThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(getBioThunk.fulfilled, (state, action) => {
                state.bio = action.payload;
                state.bios.push(action.payload);
                state.loading = false;
            })
            .addCase(getBioThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string || "Failed to fetch bio";
            })
            .addCase(createBioThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(createBioThunk.fulfilled, (state, action) => {
                state.bio = action.payload;
                state.bios.push(action.payload);
                state.loading = false;
            })
            .addCase(createBioThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string || "Failed to create bio";
            })
            .addCase(updateBioThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateBioThunk.fulfilled, (state, action) => {
                const index = state.bios.findIndex(bio => bio.id === action.payload.id);
                if (index !== -1) {
                    state.bios[index] = action.payload;
                }
                state.loading = false;
            })
            .addCase(updateBioThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string || "Failed to update bio";
            })
            .addCase(deleteBioThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteBioThunk.fulfilled, (state, action) => {
                state.bios = state.bios.filter(bio => bio.id !== action.payload);
                state.loading = false;
            })
            .addCase(deleteBioThunk.rejected, (state, action) => {
                state.error = action.payload as string || "Failed to delete bio";
                state.loading = false;
            })
    }
})

export const { setBio, addBio, updateBio, deleteBio, resetBioState } = bioSlice.actions
export default bioSlice.reducer