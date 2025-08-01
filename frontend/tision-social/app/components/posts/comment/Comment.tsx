//comment with reactions
import React, { useState } from 'react';
import { CommentInterface } from "@/app/data/post/comment/types";
import { ThumbsUp, ThumbsDown, Smile } from "lucide-react";
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';
import { Reaction } from "@/app/data/post/comment/reaction/types";
import { reactioRenderMap } from "@/app/components/posts/comment/utils/reactionMap";
import { useDispatch } from "react-redux";
import { addReaction } from '@/app/data/post/comment/reaction/reactionSlice';




interface CommentProps {
    comment: CommentInterface;
    reactorId: number;
}

const Comment: React.FC<CommentProps> = ({ comment, reactorId }) => {
    const dispatch = useDispatch();
    const [showPicker, setShowPicker] = useState<boolean>(false);
    const [selectedEmoji, setSelectedEmoji] = useState<string>("");

    const handleLike = () => {
        const reaction: Reaction = reactioRenderMap("like", comment.id, reactorId);
        dispatch(addReaction(reaction))
    }

    const handleDislike = () => {
        const reaction: Reaction = reactioRenderMap("dislike", comment.id, reactorId);
        dispatch(addReaction(reaction))
    }

    const handleEmoji = (emoji: any) => {
        const native = emoji.native;
        setSelectedEmoji(emoji.native);
        setShowPicker(false);
        const reaction: Reaction = reactioRenderMap("emoji", comment.id, reactorId, native);
        dispatch(addReaction(reaction))
    }
    return (
        <div className="flex flex-col gap-2 bg-white shadow-sm rounded-md p-3 border">
            <div className="text-gray-800">{comment.body}</div>
            {/* Comment Reactions */}

            <div className="flex flex-row justify-start gap-4 text-sm text-gray-600">
                <div className="flex flex-row gap-1 items-center" onClick={handleLike}>
                    <ThumbsUp className="w-5 h-5 text-blue-500" />

                </div>
                <div className="flex flex-row gap-1 items-center" onClick={handleDislike}>
                    <ThumbsDown className="w-5 h-5 text-blue-500" />
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
            </div>
        </div>
    )
}
export default Comment