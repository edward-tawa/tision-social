import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createUserThunk, getUserThunk, getUsersThunk, updateUserThunk, deleteUserThunk } from "@/app/data/user/thunk";
import { PublicUser } from "@/app/data/user/types";




const initialUser = {
    id: Date.now(),
    firstname: "",
    lastname: "",
    username: "",
    email: "",
}

interface NormalizedUsers {
    byId: Record<number, PublicUser>;
    userIds: number[];
}

export interface NormalizedUsersState {
    user: PublicUser;
    users: NormalizedUsers;
    count: number;
    page: number;
    pageSize: number;
    loading: boolean;
    error?: string;
}
export const initialState: NormalizedUsersState = {
    user: initialUser,
    users: {
        byId: {},
        userIds: []
    },
    count: 0,
    page: 1,
    pageSize: 20,
    loading: false,
    error: undefined
}

const userSlice = createSlice({
    name: "userSlice",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<PublicUser>) => {
            state.user = action.payload;
        },

        addUser: (state, action: PayloadAction<PublicUser>) => {
            if (!state.users.byId[action.payload.id]) {
                state.users.byId[action.payload.id] = action.payload;
                state.users.userIds.push(action.payload.id);
            }
        },

        updateUser: (state, action: PayloadAction<PublicUser>) => {
            if (state.users.byId[action.payload.id] && state.users.userIds.includes(action.payload.id)) {
                state.users.byId[action.payload.id] = action.payload;
                return
            }
            state.users.byId[action.payload.id] = action.payload;
            state.users.userIds.push(action.payload.id);

        },

        deleteUser: (state, action: PayloadAction<number>) => {
            if (state.users.byId[action.payload] && state.users.userIds.includes(action.payload)) {
                delete state.users.byId[action.payload];
                state.users.userIds = state.users.userIds.filter(id => id !== action.payload);
            }
        },
        //append new users
        addUsers: (state, action: PayloadAction<PublicUser[]>) => {
            action.payload.forEach(user => {
                if (!state.users.byId[user.id]) {
                    state.users.byId[user.id] = user;
                    state.users.userIds.push(user.id);
                }
            })
        },

        resetUser: (state) => {
            state.user = initialUser;
            state.users.byId = {};
            state.users.userIds = [];
            state.count = 0;
            state.page = 1;
            state.pageSize = 20;
            state.loading = false;
            state.error = undefined;
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(createUserThunk.pending, (state) => {
                // Optionally handle pending state
                state.loading = true;

            })
            .addCase(createUserThunk.fulfilled, (state, action) => {
                if (!state.users.byId[action.payload.id]) {
                    state.users.byId[action.payload.id] = action.payload
                    state.users.userIds.push(action.payload.id);
                    state.loading = false;
                }
            })
            .addCase(createUserThunk.rejected, (state, action) => {
                // Optionally handle rejected state
                console.error(`Error creating user: ${action.error.message || action.payload}`);
                state.loading = false;
                state.error = action.error.message || "Failed to create user";
            })

            ///getUser Case
            .addCase(getUserThunk.pending, (state) => {
                state.loading = true;
            })

            .addCase(getUserThunk.fulfilled, (state, action) => {
                if (!state.users.byId[action.payload.id]) {
                    state.users.byId[action.payload.id] = action.payload;
                    state.users.userIds.push(action.payload.id);
                }
                state.loading = false;
            })

            .addCase(getUserThunk.rejected, (state, action) => {
                console.error(`Error fetching user: ${action.error.message || action.payload}`);
                state.loading = false;
                state.error = action.error.message || "Failed to fetch user";
            })

            //getUsers


            .addCase(getUsersThunk.pending, (state) => {
                state.loading = true;
            })

            .addCase(getUsersThunk.fulfilled, (state, action) => {
                const { users, count } = action.payload;
                state.users.byId = {};
                state.users.userIds = [];
                users.forEach(user => {
                    state.users.byId[user.id] = user;
                    state.users.userIds.push(user.id);
                });
                state.count = count;
                state.loading = false;
            })

            .addCase(getUsersThunk.rejected, (state, action) => {
                console.error(`Error fetching user: ${action.error.message || action.payload}`);
                state.loading = false;
                state.error = action.error.message || "Failed to fetch user";
            })


            .addCase(updateUserThunk.pending, (state) => {
                state.loading = true;
            })

            .addCase(updateUserThunk.fulfilled, (state, action) => {
                if (state.users.byId[action.payload.id]) {
                    state.users.byId[action.payload.id] = action.payload
                    state.loading = false
                }
            })
            .addCase(updateUserThunk.rejected, (state, action) => {
                state.error = action.payload as string || "Error occured while updating user"
                state.loading = false;
            })
            .addCase(deleteUserThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteUserThunk.fulfilled, (state, action) => {
                if (state.users.byId[action.payload]) {
                    delete state.users.byId[action.payload];
                    state.users.userIds = state.users.userIds.filter(id => id !== action.payload);
                    state.loading = false;
                }
            })
            .addCase(deleteUserThunk.rejected, (state, action) => {
                state.error = action.payload as string || "Error occured while deleting user";
                state.loading = false;

            })

    }
})

export const { setUser, addUser, updateUser, deleteUser, addUsers, resetUser } = userSlice.actions
export default userSlice.reducer