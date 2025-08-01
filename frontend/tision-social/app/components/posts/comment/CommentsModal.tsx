//Modal component that lists the comments of a post, comments list comes from state;
import React from 'react';
import { useEffect, useRef } from "react";
import { CommentInterface } from "@/app/data/post/comment/types";
import Comment from "@/app/components/posts/comment/Comment"

interface CommentsModalProps {
    comments: CommentInterface[];
    userId: number;
    close: () => void;
}

const CommentsModal: React.FC<CommentsModalProps> = ({ comments, userId, close }) => {
    const clickRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const clickOutside = (event: Event) => {
            if (clickRef.current && !clickRef.current.contains(event.target as Node)) {
                close();
            }
        }

        document.addEventListener("mousedown", clickOutside);

        return () => {
            document.removeEventListener("mousedown", clickOutside);
        }
    }, [])

    return (
        <div className="fixed top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 bg-white rounded-lg shadow-lg z-50 w-[350px] h-[360px] sm:w-[800px] sm:h-[600px] p-2" ref={clickRef}>
            {/* Close Button */}
            < div className="flex justify-between" >
                <p className="font-bold text-lg">Comments</p>
                <button
                    onClick={close}
                    className="text-gray-500 hover:text-black text-4xl font-bold cursor-pointer"
                >
                    &times;
                </button>
            </div >
            {/**Comments list */}
            <div className=" max-h-[600px] overflow-y-auto custom-scrollbar">
                {!Array.isArray(comments) || comments.length === 0 ? (
                    <p className="text-center text-gray-400 mt-4">No comments yet.</p>
                ) : (
                    comments.map((comment) => (
                        <Comment key={comment.id} comment={comment} reactorId={userId} />
                    ))
                )}
            </div>
        </div>
    )
}

export default CommentsModal