//slice for post comments. It has crud operations for post comment. it maps post id to its current comment and previous comments
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CommentInterface } from "@/app/data/post/comment/types";
import {
    getCommentThunk,
    getCommentsThunk,
    createCommentThunk,
    updateCommentThunk,
    deleteCommentThunk,
} from "@/app/data/post/comment/thunk";




interface NormalizedComments {
    byId: Record<number, CommentInterface>;
    commentIds: number[];
}

interface PostCommentState {
    comment: CommentInterface;
    comments: NormalizedComments;
    loading: boolean;
    error?: string;
}

const initialComment: CommentInterface = {
    id: Date.now(),
    postId: Date.now(),
    commenterId: Date.now(),
    body: "",
    createdAt: Date.now().toString(),
}
const initialState: PostCommentState = {
    comment: initialComment,
    comments: {
        byId: {},
        commentIds: [],
    },
    loading: false,
    error: undefined,
};


const commentSlice = createSlice({
    name: "commentSlice",
    initialState,
    reducers: {
        setComment: (state, action: PayloadAction<CommentInterface>) => {
            state.comment = action.payload;
        },

        addComment: (state, action: PayloadAction<CommentInterface>) => {
            if (!state.comments.byId[action.payload.id]) {
                state.comments.byId[action.payload.id] = action.payload;
                state.comments.commentIds.push(action.payload.id);
            }
        },

        addComments: (state, action: PayloadAction<CommentInterface[]>) => {
            action.payload.forEach(comment => {
                if (!state.comments.byId[comment.id]) {
                    state.comments.byId[comment.id] = comment;
                    state.comments.commentIds.push(comment.id);
                }
            })
        },

        updateComment: (state, action: PayloadAction<CommentInterface>) => {
            const commentId = action.payload.id;
            if (state.comments.byId[commentId]) {
                state.comments.byId[commentId] = action.payload;
            }
        },

        deleteComment: (state, action: PayloadAction<number>) => {
            delete state.comments.byId[action.payload];
            state.comments.commentIds = state.comments.commentIds.filter(id => id !== action.payload);
        },

        resetCommentState: (state) => {
            state.comment = initialComment;
            state.comments.byId = {};
            state.comments.commentIds = [];
        }

    },

    extraReducers: (builder) => {
        // GET single comment
        builder
            .addCase(getCommentThunk.pending, (state) => {
                state.loading = true;
                state.error = undefined;
            })
            .addCase(getCommentThunk.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(getCommentThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // GET all comments
        builder
            .addCase(getCommentsThunk.pending, (state) => {
                state.loading = true;
                state.error = undefined;
            })
            .addCase(getCommentsThunk.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(getCommentsThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // CREATE comment
        builder
            .addCase(createCommentThunk.pending, (state) => {
                state.loading = true;
                state.error = undefined;
            })
            .addCase(createCommentThunk.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(createCommentThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // UPDATE comment
        builder
            .addCase(updateCommentThunk.pending, (state) => {
                state.loading = true;
                state.error = undefined;
            })
            .addCase(updateCommentThunk.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(updateCommentThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // DELETE comment
        builder
            .addCase(deleteCommentThunk.pending, (state) => {
                state.loading = true;
                state.error = undefined;
            })
            .addCase(deleteCommentThunk.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(deleteCommentThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { setComment, addComment, addComments, updateComment, resetCommentState } = commentSlice.actions;
export default commentSlice.reducer;
