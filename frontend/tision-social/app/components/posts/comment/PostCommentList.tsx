//PostCommentList: comment and see a listof other commnets below
import React from 'react'
import { useDispatch } from "react-redux";
import { addComment } from '@/app/data/post/comment/commentSlice';
import { clearPostActive } from "@/app/data/post/postState/ActivePost";
import { useEffect, useRef, useState } from "react";
import Button from "@/app/components/buttons/Button";
import { Smile } from "lucide-react";
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';
import { CommentInterface } from "@/app/data/post/comment/types";
import Comment from "@/app/components/posts/comment/Comment"



interface PostCommentsProps {
    comments: CommentInterface[];
    postId: number;
    userId: number;
    close: () => void;
}



// receives  comments from redux state and post id from clicked post
const PostCommentList: React.FC<PostCommentsProps> = ({ comments, postId, userId, close }) => {
    const [showPicker, setShowPicker] = useState<boolean>(false);
    const [selectedEmoji, setSelectedEmoji] = useState<string>("");
    const [commentInput, setCommentInput] = useState<string>("");
    const clickRef = useRef<HTMLDivElement>(null);
    const dispatch = useDispatch();

    useEffect(() => {
        const clickOutside = (event: Event) => {
            if (clickRef.current && !clickRef.current.contains(event.target as Node)) {
                // If clicked outside the modal, close the comments
                close();
            }
        };

        document.addEventListener("mousedown", clickOutside);

        return () => {
            document.removeEventListener("mousedown", clickOutside);
        }
    }, [])

    const handleCommentText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setCommentInput(e.target.value);
    }
    const handleCommentSend = () => {
        const postComment: CommentInterface = {
            id: Date.now(),
            body: commentInput,
            createdAt: new Date().toISOString(),
            postId,
            commenterId: userId,
        }

        if (commentInput.trim()) {
            dispatch(addComment(postComment));
            setCommentInput("");
        }
        setCommentInput("");
        setSelectedEmoji("");
        setShowPicker(false);
    }

    const handleCloseCommentsListModal = () => {
        dispatch(clearPostActive());
        setSelectedEmoji(""); // Clear the selected emoji when closing comments
        setShowPicker(false);
        setCommentInput("");
        close();
    }



    return (
        < div
            ref={clickRef}
            onClick={(event) => event.stopPropagation()}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  bg-opacity-30 bg-white rounded-xl shadow-lg p-2 w-[350px] h-[360px] sm:w-[700px] sm:h-[540px] flex flex-col border border-gray-200 gap-2"
        >
            {/* Close Button */}
            < div className="flex justify-end" >
                <button
                    onClick={handleCloseCommentsListModal}
                    className="text-gray-500 hover:text-black text-4xl font-bold cursor-pointer"
                >
                    &times;
                </button>
            </div >

            {/* Textarea + emoji + Button */}
            < div className="flex flex-row gap-2 mb-4 items-center" >
                <textarea
                    rows={1}
                    onChange={handleCommentText}
                    value={commentInput}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                            handleCommentSend();
                        }
                    }}
                    className="w-full p-2 bg-white border border-gray-300 rounded-lg resize-none"
                    placeholder="Write a comment..."
                />
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
                                <Picker
                                    data={data}
                                    onEmojiSelect={(emoji: any) => {
                                        setCommentInput(prev => prev + emoji.native);
                                    }}
                                />
                            </div>
                        </div>
                    )}

                </div>

                <Button
                    size="small"
                    color="secondary"
                    text="Comment"
                    onClick={handleCommentSend}
                    className="rounded-lg cursor-pointer"
                />
            </div >

            {/* Comments List */}
            < div className="mt-3 flex flex-col gap-2 max-h-[400px] overflow-y-auto custom-scrollbar" >
                {!Array.isArray(comments) || comments.length === 0 ? (
                    <p className="text-center text-gray-400 mt-4">No comments yet.</p>
                ) : (
                    comments.map((comment) => (
                        <Comment key={comment.id} comment={comment} reactorId={userId} />
                    ))
                )}
            </div >
        </div >
    )
}

export default PostCommentList