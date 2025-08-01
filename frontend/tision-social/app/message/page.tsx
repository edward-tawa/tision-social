import React from 'react'
import { MessageUnion } from "@/app/data/message/types";
import MessageList from "@/app/components/message/MessageList";

export const dummyTextMessages: MessageUnion[] = Array.from({ length: 5 }, (_, i) => ({
  id: i + 1,
  senderId: 1,
  receiverId: 2,
  timestamp: new Date().toISOString(),
  type: 'text',
  content: {
    content: `This is dummy text message number ${i + 1}`,
  },
}));

const page = () => {
  return (
    <div className="flex flex-col w-full h-full items-center" >
      <h1 className="font-bold text-xlg">Messages</h1>
      <div className="flex flex-col w-full max-w-2xl gap-4">
        <MessageList messages={dummyTextMessages} />
      </div>
    </div>
  )
}

export default page