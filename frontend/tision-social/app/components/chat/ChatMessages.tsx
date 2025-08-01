"use client"
import React from 'react'
import { messageUnion } from "@/app/data/message/types";
import { useSelector } from 'react-redux';
import { RootState } from '@/app/data/store/store';

interface Messages {
    messages: Extract<messageUnion, { type: 'text' }>[]
}
let currentUserId = 1; // This should be dynamically set based on the logged-in user   

const ChatMessages = () => {
    const messages = useSelector((state: RootState) => state.chatMessagesSlice.messageArray)
    return (
        <div className="bg-white sm:bg-gray-400">
            <div className="flex flex-col w-full h-full px-2 py-2 gap-2 overflow-y-auto">
                {messages.map((message, index) => (
                    <div key={message.id} className="grid grid-cols-12">
                        {message.senderId !== currentUserId && (
                            <div className="col-span-4 bg-blue-200 rounded-lg px-2 w-full">
                                {message.content.content}
                            </div>
                        )}
                        {message.senderId === currentUserId && (
                            <div className="col-start-9 col-span-4 bg-blue-200 rounded-lg px-2 overflow-x-hidden">
                                {message.content.content}
                            </div>
                        )}
                    </div>
                ))}
            </div>



        </div>
    )
}

export default ChatMessages