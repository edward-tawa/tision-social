import { RootState } from "@/app/data/store/store";
import { Post } from "@/app/data/post/types";
import { createSelector } from "@reduxjs/toolkit";



export const posts = (state: RootState) => state.postSlice.posts;
export const loading = (state: RootState) => state.postSlice.loading;
export const nextCursor = (state: RootState) => state.postSlice.nextCursor;
export const error = (state: RootState) => state.postSlice.error;

export const selectAllPosts = (state: RootState): Post[] => {
    const postsState = posts(state);

    if (!postsState || !Array.isArray(postsState.postIds) || !postsState.byId) {
        return [];
    }

    return postsState.postIds.map(postId => postsState.byId[postId]);
};

export const selectPostById = (state: RootState, postId: number): Post | undefined => {
    return selectAllPosts(state).find(post => post.id === postId);
}


export const selectPostsByAuthor = (state: RootState, authorId: number): Post[] => {
    return selectAllPosts(state).filter(post => post.author?.id === authorId);
}


export const allPosts = createSelector(
    [selectAllPosts],
    (allPosts) => {
        return allPosts;
    }
)