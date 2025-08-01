"use client";
import React, { useState } from 'react';
import Chatt from "@/app/components/chat/Chatt";
import { chatKeyToMessagesMap } from "@/app/data/message/selectors";
import { useSelector } from "react-redux";
import UserAvatar from "@/app/components/avatars/UserAvatar";

// interface ChatListProps {
//     messages: Extract<MessageUnion, { type: "text" }>[]
// }

const ChattList: React.FC = () => {
    const messagesMap = useSelector(chatKeyToMessagesMap);
    const [chattKey, setchattKey] = useState<string | null>(null);

    const handleClose = () => {
        setchattKey(null);
    };

    const handleSelectedChat = (key: string) => {
        setchattKey(key);
    };

    if (chattKey && messagesMap[chattKey]?.length > 0) {
        return (
            <div className="w-full h-full">
                <Chatt message={messagesMap[chattKey][0]} close={handleClose} />
            </div>
        );
    }

    return (
        <div className="w-full h-full bg-primary max-w-md mx-auto flex flex-col overflow-y-auto">
            <div className="flex flex-col gap-2">
                {Object.entries(messagesMap).map(([key, messageArray]) => (
                    <div
                        key={key}
                        className="flex flex-row gap-4 cursor-pointer bg-gray-300 p-2 rounded-lg items-center"
                        onClick={() => handleSelectedChat(key)}
                    >
                        <div><UserAvatar /></div>
                        <div>{messageArray.at(-1)?.content.content}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ChattList;
