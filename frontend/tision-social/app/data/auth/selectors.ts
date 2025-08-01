import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@/app/data/store/store";

export const selectCurrentUser = (state: RootState) => state.authSlice.user;


export const currentUserSelector = createSelector(
    [selectCurrentUser],
    (user) => user
)