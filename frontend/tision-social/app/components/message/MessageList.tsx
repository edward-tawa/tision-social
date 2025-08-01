import React from 'react'
import { MessageUnion } from "@/app/data/message/types";
import Message from "@/app/components/message/Message";
import UserAvatar from '@/app/components/avatars/UserAvatar';

interface Messages {
  messages: MessageUnion[]
}

const MessageList = ({ messages }: Messages) => {
  return (
    <div className="flex flex-col w-full h-full items-center">
      <div className="flex flex-col w-full max-w-2xl gap-4 items-center">
        {messages.map(message => (
          <div className="flex flex-row gap-3 items-center hover: cursor-pointer">
            <UserAvatar />
            <Message message={message} key={message.id} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default MessageList