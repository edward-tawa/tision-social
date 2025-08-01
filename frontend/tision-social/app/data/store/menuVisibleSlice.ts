import { createSlice } from '@reduxjs/toolkit'


export interface MenuVisibleState {
    isVisible: boolean;
    position: { top: number; left: number };
} 

const menuVisibleSlice = createSlice({
    name: "menuVisible",
    initialState: {
        isVisible: false,
        position: { top: 0, left: 0 }
    } as MenuVisibleState,
    reducers: {
        showMenu: (state) => {
            state.isVisible = true;
        },
        hideMenu: (state) => {
            state.isVisible = false;
        },

        toggleMenu: (state, action) => {
            state.isVisible = !state.isVisible;
            if (action.payload) {
                state.position = action.payload;
            }
        }
    }
})


export const { showMenu, hideMenu, toggleMenu } = menuVisibleSlice.actions;
export default menuVisibleSlice.reducer;