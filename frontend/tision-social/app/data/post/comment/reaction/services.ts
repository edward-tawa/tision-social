import { getReaction, createReaction, updateReaction, deleteReaction, getReactions } from "@/app/data/post/comment/reaction/api";
import { Reaction } from "@/app/data/post/comment/reaction/types";


export const getReactionService = async (reactionId: number) => {
    return await getReaction(reactionId);
}

export const getReactionsService = async (userId: number) => {
    return await getReactions(userId);
}

export const createReactionService = async (reaction: Reaction) => {
    return await createReaction(reaction);
}

export const updateReactionService = async (reactionId: number, reaction: Partial<Reaction>) => {
    return await updateReaction(reactionId, reaction);
}

export const deleteReactionService = async (reactionId: number) => {
    return await deleteReaction(reactionId);
}


