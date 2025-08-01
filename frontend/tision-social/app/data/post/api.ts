//api.ts
import api from "@/app/data/utils/axios";
import { Post } from "@/app/data/post/types";
import { postEndPoints } from "@/app/data/post/endpoints";

export const createPost = async (post: Post): Promise<Post> => {
    try {
        const res = await api.post(postEndPoints.createpost, post);
        return res.data;
    }

    catch (error: any) {
        throw new Error(error.message || "An error occurred while creating the Post");
    }
}

export const getPost = async (postId: number): Promise<Post> => {
    try {
        const res = await api.get(postEndPoints.getpost(postId));
        return res.data;
    }
    catch (error: any) {
        throw new Error(error.message || "Error while fetching Post");
    }
}

export const getPosts = async (userId: number, cursor: number | null = null, limit = 20): Promise<{ posts: Post[], nextCursor: number }> => {
    try {
        const res = await api.get(postEndPoints.getposts(userId), { params: { cursor, limit } });
        return res.data;
    }
    catch (error: any) {
        throw new Error(error.message || "Error while fetching Posts");
    }
}

export const updatePost = async (postId: number, post: Partial<Post>): Promise<Post> => {
    try {
        const res = await api.patch(postEndPoints.updatepost(postId), post)
        return res.data
    }
    catch (error: any) {
        throw new Error(error.message || "Error while updating Post");
    }
}


export const deletePost = async (postId: number): Promise<number> => {
    try {
        const res = await api.delete(postEndPoints.deletepost(postId));
        return res.data;
    }
    catch (error: any) {
        throw new Error(error.message || "Error while deleting Post");
    }
}
