import { getComment, createComment, updateComment, deleteComment, getComments } from "@/app/data/post/comment/api";
import { CommentInterface } from "@/app/data/post/comment/types";


export const getCommentService = async (commentId: number) => {
    return await getComment(commentId);
}

export const getCommentsService = async (userId: number) => {
    return await getComments(userId);
}

export const createCommentService = async (comment: CommentInterface) => {
    return await createComment(comment);
}

export const updateCommentService = async (commentId: number, comment: Partial<CommentInterface>) => {
    return await updateComment(commentId, comment);
}

export const deleteCommentService = async (CommentId: number) => {
    return await deleteComment(CommentId);
}
