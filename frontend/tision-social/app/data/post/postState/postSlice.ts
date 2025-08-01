import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
    getPostThunk,
    getPostsThunk,
    createPostThunk,
    updatePostThunk,
    deletePostThunk,
} from "@/app/data/post/thunk";
import { Post } from "@/app/data/post/types";


export interface NormalizedPosts {
    byId: Record<number, Post>
    postIds: number[],
}

export interface PostsState {
    posts: NormalizedPosts;
    loading: boolean;
    error?: string;
    nextCursor: number | null;
    limit: number;
}



const initialState: PostsState = {
    posts: {
        byId: {},
        postIds: []
    },
    loading: false,
    error: "",
    nextCursor: null,
    limit: 20,
}


const postSlice = createSlice({
    name: "postSlice",
    initialState,
    reducers: {
        addPost: (state: PostsState, action: PayloadAction<Post>) => {
            if (!state.posts.byId[action.payload.id]) {
                state.posts.byId[action.payload.id] = action.payload;
                state.posts.postIds.push(action.payload.id);
            }
        },

        updatePost: (state: PostsState, action: PayloadAction<Post>) => {
            const postId = action.payload.id
            state.posts.byId[postId] = action.payload;
            if (!state.posts.postIds.includes(action.payload.id)) {
                state.posts.postIds.push(action.payload.id);
            }

        },

        deletePost: (state, action: PayloadAction<number>) => {
            if (state.posts.byId[action.payload]) {
                delete state.posts.byId[action.payload];
            }
            state.posts.postIds = state.posts.postIds.filter(id => id !== action.payload);
        },

        appendPosts: (state, action: PayloadAction<Post[]>) => {
            action.payload.forEach(post => {
                if (!state.posts.byId[post.id]) {
                    state.posts.byId[post.id] = post
                    state.posts.postIds.push(post.id);
                }
            })
        },

        prependPosts: (state, action: PayloadAction<Post[]>) => {
            const newIds: number[] = []
            action.payload.forEach(post => {
                if (!state.posts.byId[post.id]) {
                    state.posts.byId[post.id] = post
                    newIds.push(post.id)
                }
            })
            state.posts.postIds = [...newIds, ...state.posts.postIds];
        },

        setPosts: (state, action: PayloadAction<Post[]>) => {
            action.payload.forEach(post => {
                if (!state.posts.byId[post.id]) {
                    state.posts.byId[post.id] = post;
                    state.posts.postIds.push(post.id);
                }
            })
        },

        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload
        },

        setNextCursor: (state, action: PayloadAction<number>) => {
            state.nextCursor = action.payload
        },

        resetPosts: (state) => {
            state.posts.byId = {};
            state.posts.postIds = [];
            state.loading = false;
            state.error = "";
            state.nextCursor = null;
            state.limit = 20;
        }
    },
    extraReducers: (builder) => {
        builder
            // GET SINGLE POST
            .addCase(getPostThunk.pending, (state) => {
                state.loading = true;
                state.error = "";
            })
            .addCase(getPostThunk.fulfilled, (state, action: PayloadAction<Post>) => {
                state.loading = false;
                state.posts.byId[action.payload.id] = action.payload;
                if (!state.posts.postIds.includes(action.payload.id)) {
                    state.posts.postIds.push(action.payload.id);
                }
            })
            .addCase(getPostThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // GET ALL POSTS
            .addCase(getPostsThunk.pending, (state) => {
                state.loading = true;
                state.error = "";
            })
            .addCase(getPostsThunk.fulfilled, (state, action) => {
                state.loading = false;
                const { posts, nextCursor } = action.payload;
                posts.forEach(post => {
                    if (!state.posts.byId[post.id]) {
                        state.posts.byId[post.id] = post;
                        state.posts.postIds.push(post.id);
                    }
                });
                state.nextCursor = nextCursor;
            })
            .addCase(getPostsThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // CREATE POST
            .addCase(createPostThunk.pending, (state) => {
                state.loading = true;
                state.error = "";
            })
            .addCase(createPostThunk.fulfilled, (state, action: PayloadAction<Post>) => {
                state.loading = false;
                const post = action.payload;
                state.posts.byId[post.id] = post;
                if (!state.posts.postIds.includes(post.id)) {
                    state.posts.postIds.unshift(post.id); // prepend new post
                }
            })
            .addCase(createPostThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // UPDATE POST
            .addCase(updatePostThunk.pending, (state) => {
                state.loading = true;
                state.error = "";
            })
            .addCase(updatePostThunk.fulfilled, (state, action: PayloadAction<Post>) => {
                state.loading = false;
                const post = action.payload;
                state.posts.byId[post.id] = post;
                if (!state.posts.postIds.includes(post.id)) {
                    state.posts.postIds.push(post.id);
                }
            })
            .addCase(updatePostThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string || "Error updating post";
            })

            // DELETE POST
            .addCase(deletePostThunk.pending, (state) => {
                state.loading = true;
                state.error = undefined;
            })
            .addCase(deletePostThunk.fulfilled, (state, action: PayloadAction<number>) => {
                state.loading = false;
                const id = action.payload;
                delete state.posts.byId[id];
                state.posts.postIds = state.posts.postIds.filter(postId => postId !== id);
            })
            .addCase(deletePostThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    }
})

export const { addPost, deletePost, setPosts, setLoading, setNextCursor } = postSlice.actions;
export default postSlice.reducer;

