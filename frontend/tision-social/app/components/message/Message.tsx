import React from 'react';
import { messageTypeData, GenericMessage, MessageUnion } from "@/app/data/message/types";

export type messageCardProps = {
  message: MessageUnion
}

const renderMap: { [T in keyof messageTypeData]: React.FC<{ message: GenericMessage<T> }> } = {
  text: ({ message }) => <div className="bg-white rounded-lg px-2 py-2 flex flex-col">
    <div>{message.content.content}</div>
    <div>{message.timestamp}</div>
  </div>,
  image: ({ message }) => <div className="bg-white rounded-lg px-2 py-2">{message.content.image}</div>,
  video: ({ message }) => <div className="bg-white rounded-lg px-2 py-2">{message.content.video}</div>,
  audio: ({ message }) => <div className="bg-white rounded-lg px-2 py-2">{message.content.audio}</div>,
}

const Message: React.FC<messageCardProps> = ({ message }) => {
  const RenderMessage = renderMap[message.type] as React.FC<{ message: Extract<MessageUnion, { type: typeof message.type }> }>;
  return (
    <div>
      <RenderMessage message={message} />
    </div>
  )
}

export default Message