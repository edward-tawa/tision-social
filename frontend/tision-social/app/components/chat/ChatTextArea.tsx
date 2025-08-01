"use client";
import React from 'react';
import Button from "@/app/components/buttons/Button";
import { useDispatch, useSelector } from 'react-redux';
import { setTextArea } from "@/app/data/store/slices/chat/chatTextAreaSlice";
import { RootState } from "@/app/data/store/store";
import { MessageUnion } from '@/app/data/message/types';
import { addMessage } from '@/app/data/message/messageSlice';

interface Message {
    message: Extract<MessageUnion, { type: 'text' }>
}

interface ChatTextAreaProps {
    receiverId: number
}

const ChatTextArea: React.FC<ChatTextAreaProps> = ({ receiverId }) => {
    const dispatch = useDispatch();
    const { message } = useSelector((state: RootState) => state.chatTextAreaSlice);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        dispatch(setTextArea(e.target.value));
    };


    const handleMessageSend = () => {
        const currentMessage = {
            id: Date.now(),
            senderId: 1,
            receiverId: receiverId,
            timestamp: new Date().toISOString(),
            type: "text",
            content: { content: message }
        }
        dispatch(addMessage(currentMessage as Extract<MessageUnion, { type: "text" }>));
        dispatch(setTextArea(""));
    }
    return (
        <div className="flex items-center gap-2 justify-center">
            <textarea
                rows={2}
                className="px-2 rounded-lg border border-gray-300 w-[70%] bg-white"
                name="textarea"
                onChange={handleChange}
                value={message}  //bind textarea to Redux state
                onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleMessageSend();
                    }
                }}
            />
            <Button text="Send" size="small" color="secondary" className="rounded-full" onClick={handleMessageSend} />
        </div>
    );
};

export default ChatTextArea;
