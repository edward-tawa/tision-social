import { createSlice } from '@reduxjs/toolkit';
interface FooterStickyState {
    isSticky: boolean;
    position: { bottom: number, left?: number };
}


const footerSlice = createSlice({
    name: "footerSlice",
    initialState: {
        isSticky: false,
        position: { bottom: 0 }
    } as FooterStickyState,
    reducers: {
        setSticky: (state: FooterStickyState, action) => {
            if (action.payload) {
                state.isSticky = action.payload;
            }
        },
        setPosition: (state, action) => {
            if (action.payload) {
                state.position = { ...action.payload }
            }
        }
    }
})


export const { setSticky, setPosition } = footerSlice.actions;
export default footerSlice.reducer;
