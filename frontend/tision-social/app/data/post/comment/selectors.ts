import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@/app/data/store/store";
import { CommentInterface } from "@/app/data/post/comment/types";




export const comments = (state: RootState) => state.commentSlice.comments;

// go through each comment, extract the postId make it a key and add the comment to the key array.


export const AllCommentsSelector = createSelector(
    [comments],
    (allComments) => {
        return allComments.commentIds.map(id => allComments.byId[id]);
    }
)


export const postIdToCommentsMap = createSelector(
    [AllCommentsSelector],
    (allComments) => {
        const map: Record<number, CommentInterface[]> = {};
        allComments.forEach(comment => {
            if (!map[comment.postId]) {
                map[comment.postId] = [];
            }
            map[comment.postId].push(comment);
        })

        return map;
    }

)

export const postIdComments = (postId: number) => createSelector(
    [postIdToCommentsMap],
    (map) => (map[postId]) || []
)



