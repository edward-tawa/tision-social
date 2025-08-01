import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@/app/data/store/store";


export const selectUserState = (state: RootState) => state.authSlice.user;


export const currentUserSelector = createSelector(
    [selectUserState],
    (user) => user
)