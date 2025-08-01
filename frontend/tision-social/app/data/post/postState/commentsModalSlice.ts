import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CommentsModalState {
    isOpen: boolean;
}

const initialState: CommentsModalState = {
    isOpen: false,
}

const commentsModalSlice = createSlice({
    name: 'commentsModalSlice',
    initialState,
    reducers: {
        openCommentsModal: (state) => {
            state.isOpen = true;
        },
        closeCommentsModal: (state) => {
            state.isOpen = false;
        },
        toggleCommentsModal: (state) => {
            state.isOpen = !state.isOpen;
        },
    },
})

export const { openCommentsModal, closeCommentsModal, toggleCommentsModal } = commentsModalSlice.actions;
export default commentsModalSlice.reducer;