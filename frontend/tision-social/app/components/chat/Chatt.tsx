"use client";
import React, { useEffect, useRef } from "react";
import { MessageUnion } from "@/app/data/message/types";
import { chatKeyToMessagesMap, chatKey } from "@/app/data/message/selectors";
import { useSelector } from "react-redux";
import ChatTextArea from "@/app/components/chat/ChatTextArea";
import { ArrowLeft } from "lucide-react";

interface ChatProps {
  message: Extract<MessageUnion, { type: "text" }>
  close: () => void;
}

const Chatt: React.FC<ChatProps> = ({ message, close }) => {
  const userId = 1; // getUserId();
  const key = chatKey(message);
  const messagesMap = useSelector(chatKeyToMessagesMap);
  const chatMessages = messagesMap[key] || [];

  const messageEndRef = useRef<HTMLDivElement | null>(null);

  // Scroll to the bottom when messages change
  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "auto" });
    }
  }, [chatMessages]);

  return (
    <div className="w-full h-full flex flex-col max-w-md mx-auto relative">
      {/* Top Bar */}
      <div className="flex justify-start p-2 cursor-pointer" onClick={close}>
        <ArrowLeft className="w-5 h-5" />
        <span className="ml-2">Back</span>
      </div>

      {/* Message List */}
      <div className="flex-1 flex flex-col w-full px-2 py-2 gap-2">
        {chatMessages.map((message) => {
          if (message.type !== "text") return null;

          const isCurrentUser = message.senderId === userId;

          return (
            <div key={message.id} className="grid grid-cols-12">
              {isCurrentUser ? (
                <div className="col-start-9 col-span-4 bg-blue-200 rounded-lg px-2 overflow-x-hidden">
                  {message.content.content}
                </div>
              ) : (
                <div className="col-span-4 bg-blue-200 rounded-lg px-2 w-full">
                  {message.content.content}
                </div>
              )}
            </div>
          );
        })}
        {/* This div ensures we scroll to bottom */}
        <div ref={messageEndRef} />
      </div>

      {/* Chat Input */}
      <div className="w-full p-2 border-t absolute bottom-5">
        <ChatTextArea receiverId={message.receiverId} />
      </div>
    </div>
  );
};

export default Chatt;
