//api.ts
import api from "@/app/data/utils/axios";
import { CommentInterface } from "@/app/data/post/comment/types";
import { commentEndPoints } from "@/app/data/post/comment/endpoints";



export const createComment = async (comment: CommentInterface): Promise<CommentInterface> => {
    try {
        const res = await api.post(commentEndPoints.createcomment, comment);
        return res.data;
    }

    catch (error: any) {
        throw new Error(error.message || "An error occurred while creating the Comment");
    }
}

export const getComment = async (commentId: number): Promise<CommentInterface> => {
    try {
        const res = await api.get(commentEndPoints.getcomment(commentId));
        return res.data;
    }
    catch (error: any) {
        throw new Error(error.message || "Error while fetching Comment");
    }
}

export const getComments = async (userId: number): Promise<CommentInterface[]> => {
    try {
        const res = await api.get(commentEndPoints.getcomments(userId));
        return res.data;
    }
    catch (error: any) {
        throw new Error(error.message || "Error while fetching Comments");
    }
}

export const updateComment = async (commentId: number, comment: Partial<CommentInterface>): Promise<CommentInterface> => {
    try {
        const res = await api.patch(commentEndPoints.updatecomment(commentId), comment);
        return res.data;
    }
    catch (error: any) {
        throw new Error(error.message || "Error while updating Comment");
    }
}


export const deleteComment = async (commentId: number): Promise<number> => {
    try {
        const res = await api.delete(commentEndPoints.deletecomment(commentId));
        return res.data;
    }
    catch (error: any) {
        throw new Error(error.message || "Error while deleting Comment");
    }
}
