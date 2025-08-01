import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@/app/data/store/store";
import { Reaction } from "@/app/data/post/comment/reaction/types";


export const reactions = (state: RootState) => state.reactionSlice.reactions;

export const allReactionsSelector = createSelector(
    [reactions],
    (allreactions) => {
        return allreactions.reactionIds.map(id => allreactions.byId[id]);
    }
)

//a map of targetId to an array of its reactions.
export const targetIdToReactionsMap = createSelector(
    [allReactionsSelector],
    (reactions) => {
        const map: Record<number, Reaction[]> = {}
        reactions.forEach(reaction => {
            if (!map[reaction.targetId]) {
                map[reaction.targetId] = []
            }
            map[reaction.targetId].push(reaction);
        })
        return map;
    }
)

export const targetIdReactions = (targetId: number) => createSelector(
    [targetIdToReactionsMap],
    (map) => {
        return map[targetId] || []
    }
);




export const likes = (targetId: number) => createSelector(
    [targetIdReactions(targetId)],
    (reactions) => {
        return reactions.filter(reaction => reaction.type === "like" && reaction.content.status).length;
    }
)


export const dislikes = (targetId: number) => createSelector(
    [targetIdReactions(targetId)],
    (reactions) => {
        return reactions.filter(reaction => reaction.type === "dislike" && reaction.content.status).length;
    }
)


export const emojis = (targetId: number) => createSelector(
    [targetIdReactions(targetId)],
    (reactions) => {
        return reactions.filter(reaction => reaction.type === "emoji" && reaction.content.value).length;
    }
)