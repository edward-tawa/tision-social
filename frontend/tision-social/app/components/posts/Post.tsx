"use client"
import React from 'react';
import { ThumbsUp, ThumbsDown, MessageCircle, Smile, MoreHorizontal } from "lucide-react";
import { Post as UserPost } from "@/app/data/post/types";
import UserAvatar from "@/app/components/avatars/UserAvatar";
import PostCommentList from "@/app/components/posts/comment/PostCommentList";
import CommentsModal from "@/app/components/posts/comment/CommentsModal";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { useState } from "react";
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';
import RenderPostMap from "@/app/components/posts/utils/RenderPostMap";
import { CommentInterface } from "@/app/data/post/comment/types";
import { Reaction } from "@/app/data/post/comment/reaction/types";
import { reactionRenderMap } from "@/app/components/posts/comment/utils/reactionMap";
import { addReaction, deleteReaction } from '@/app/data/post/comment/reaction/reactionSlice';

interface PostProps {
    post: UserPost;
    comments: CommentInterface[];
    userId: number;
    likeCount: number;
    dislikeCount: number;
    emojiCount: number;
}
const Post: React.FC<PostProps> = ({ post, comments, userId, likeCount, dislikeCount, emojiCount }) => {


    const dispatch = useDispatch();
    const [likeReaction, setLikeReaction] = useState<Reaction | null>(null);
    const [dislikeReaction, setDislikeReaction] = useState<Reaction | null>(null);
    const [showPicker, setShowPicker] = useState<boolean>(false);
    const [selectedEmoji, setSelectedEmoji] = useState<string>("");
    const [postCommentListOpen, setPostCommentListOpen] = useState<boolean>(false);
    const [commentsModalOpen, setCommentsModalOpen] = useState<boolean>(false);


    // set the comment to visible
    const handlePostCommentList = () => {
        setPostCommentListOpen(true);
    }

    const handleCommentsModal = () => {
        setCommentsModalOpen(true);
    }

    //like reaction
    const handleLike = () => {
        if (likeReaction) {
            // User already liked — delete
            dispatch(deleteReaction(likeReaction.id));
            setLikeReaction(null);
        } else {
            const newReaction = reactionRenderMap("like", post.id, userId);
            dispatch(addReaction(newReaction));
            setLikeReaction(newReaction);
        }
    };
    //dislike reaction
    const handleDislike = () => {
        if (dislikeReaction) {
            dispatch(deleteReaction(dislikeReaction.id));
            setDislikeReaction(null);
        } else {
            const newReaction = reactionRenderMap("dislike", post.id, userId);
            dispatch(addReaction(newReaction));
            setDislikeReaction(newReaction);
        }
    };

    const handleEmoji = (emoji: any) => {
        const native = emoji.native;
        setSelectedEmoji(emoji.native);
        setShowPicker(false);
        const reaction: Reaction = reactionRenderMap("emoji", post.id, userId, native);
        dispatch(addReaction(reaction));
    }
    return (
        <>
            <div className="w-full min-h-[300px] md:min-h-[400px] lg:min-h-[500px] flex flex-col bg-white rounded-lg p-2 gap-2">
                <div className="flex flex-row w-full justify-between items-center">
                    {/**User Avatar */}
                    <div className="flex flex-row">
                        <Link href="/profile">
                            <UserAvatar />
                        </Link>
                    </div>
                    <div className="flex flex-row">
                        <MoreHorizontal className="w-6 h-6 text-blue-600 cursor-pointer" />
                    </div>
                </div>
                <div className="w-full min-h-[300px] sm:min-h-[350px] md:min-h-[430px]">
                    {/**Post Content Goes Here */}
                    {
                        <RenderPostMap post={post} />
                    }
                </div>
                {/**The comment and emoji Section*/}
                < div className="flex flex-row w-full min-h-[30px] justify-between">
                    <div className="flex flex-row w-full items-center gap-4">
                        <div className="flex flex-row gap-1 items-center cursor-pointer">
                            <ThumbsUp
                                className={likeReaction ? "w-5 h-5 fill-current text-blue-500" : "w-5 h-5 text-blue-500"}
                                onClick={handleLike}
                            />
                            {likeCount > 0 && (<p>{likeCount}</p>)}
                        </div>
                        <div className="flex flex-row gap-1 items-center cursor-pointer">
                            <ThumbsDown
                                className={dislikeReaction ? "w-5 h-5 fill-current text-red-500" : "w-5 h-5 text-blue-500"}
                                onClick={handleDislike}
                            />
                            {dislikeCount > 0 && (<p>{dislikeCount}</p>)}
                        </div>

                        <div className="relative cursor-pointer">
                            {selectedEmoji ? (
                                <span
                                    className="text-lg"
                                    onClick={() => setShowPicker(!showPicker)}
                                >
                                    {selectedEmoji}
                                </span>
                            ) :

                                (
                                    <Smile className="w-5 h-5 text-yellow-500" onClick={() => setShowPicker(!showPicker)} />
                                )}

                            {showPicker && (
                                <div className="absolute top-8 left-0 z-50">
                                    <div className="max-h-[250px] overflow-y-auto rounded-lg custom-scrollbar">
                                        <Picker data={data} onEmojiSelect={handleEmoji} />
                                    </div>
                                </div>
                            )}

                        </div>

                        <div className="flex flex-row gap-1 items-center gap-2">
                            <MessageCircle className="w-5 h-5 text-gray-500 cursor-pointer" onClick={handlePostCommentList} />

                            {/* {count > 0 && (<p>{count}</p>)} */}
                        </div>
                    </div>
                    <div className="flex flex-row w-full items-center justify-end gap-1 px-2">
                        <div className="text-text-color text-lg cursor-pointer hover:underline items-center" onClick={handleCommentsModal}>Comment</div>
                        <div onClick={handleCommentsModal} className="items-center"><MessageCircle className="w-5 h-5 text-gray-500 cursor-pointer" /></div>
                    </div>
                </div>
            </div>
            {postCommentListOpen && <PostCommentList comments={comments} postId={post.id} userId={userId} close={() => setPostCommentListOpen(false)} />}

            {commentsModalOpen && <CommentsModal comments={comments} userId={userId} close={() => setCommentsModalOpen(false)} />}


        </>
    )
}

export default Post