//authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getUserThunk } from "@/app/data/user/thunk";


export interface UserInterface {
    id: number;
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    password: string;
}
export type PublicUser = Omit<UserInterface, "password">


interface UserState {
    user: PublicUser;
    loading: boolean;
    error?: string;
}

const initialUser = {
    id: Date.now(),
    firstname: "",
    lastname: "",
    username: "",
    email: "",
}



const initialState: UserState = {
    user: initialUser,
    loading: false,
    error: undefined
}

const authSlice = createSlice({
    name: "authSlice",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<PublicUser>) => {
            state.user = action.payload;
        },

        resetUser: (state) => {
            state.user = initialUser;
            state.loading = false;
            state.error = undefined;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUserThunk.pending, (state) => {
                state.loading = true;
            })

            .addCase(getUserThunk.fulfilled, (state, action) => {
                if (!state.user) {
                    state.user = action.payload;
                }
                state.loading = false;
            })

            .addCase(getUserThunk.rejected, (state, action) => {
                console.error(`Error fetching user: ${action.error.message || action.payload}`);
                state.loading = false;
                state.error = action.error.message || "Failed to fetch user";
            })
    }
})

export const { setUser, resetUser } = authSlice.actions
export default authSlice.reducer