import { getPost, createPost, updatePost, deletePost, getPosts } from "@/app/data/post/api";
import { Post } from "@/app/data/post/types";


export const getPostService = async (postId: number) => {
    return await getPost(postId);
}

export const getPostsService = async (userId: number, cursor: number | null, limit: number) => {
    return await getPosts(userId, cursor, limit);
}

export const createPostService = async (post: Post) => {
    return await createPost(post);
}

export const updatePostService = async (postId: number, post: Partial<Post>) => {
    return await updatePost(postId, post);
}

export const deletePostService = async (postId: number) => {
    return await deletePost(postId);
}