//api.ts
import { Reaction } from "@/app/data/post/comment/reaction/types";
import api from "@/app/data/utils/axios";
import { reactionEndPoints } from "@/app/data/post/comment/reaction/endpoints";




export const createReaction = async (reaction: Reaction): Promise<Reaction> => {
    try {
        const res = await api.post(reactionEndPoints.createreaction, reaction);
        return res.data;
    }

    catch (error: any) {
        throw new Error(error.message || "An error occurred while creating the Reaction");
    }
}

export const getReaction = async (reactionId: number): Promise<Reaction> => {
    try {
        const res = await api.get(reactionEndPoints.getreaction(reactionId));
        return res.data;
    }
    catch (error: any) {
        throw new Error(error.message || "Error while fetching Reaction");
    }
}

export const getReactions = async (userId: number): Promise<Reaction[]> => {
    try {
        const res = await api.get(reactionEndPoints.getreactions(userId));
        return res.data;
    }
    catch (error: any) {
        throw new Error(error.message || "Error while fetching Reactions");
    }
}

export const updateReaction = async (reactionId: number, reaction: Partial<Reaction>): Promise<Reaction> => {
    try {
        const res = await api.patch(reactionEndPoints.updatereaction(reactionId), reaction);
        return res.data;
    }
    catch (error: any) {
        throw new Error(error.message || "Error while updating Reaction");
    }
}


export const deleteReaction = async (reactionId: number): Promise<number> => {
    try {
        const res = await api.delete(reactionEndPoints.deletereaction(reactionId));
        return res.data;
    }
    catch (error: any) {
        throw new Error(error.message || "Error while deleting Reaction");
    }
}

