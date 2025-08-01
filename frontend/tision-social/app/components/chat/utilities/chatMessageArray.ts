import { messageUnion } from "@/app/data/message/types";

type Message = Extract<messageUnion, { type: "text" }>

export const chatMessageArray = (
    messages: Message[],
    userAId: number,
    userBId: number
): Message[] => {
    return messages
        .filter(
            (message) =>
                (message.senderId === userAId && message.receiverId === userBId) ||
                (message.senderId === userBId && message.receiverId === userAId)
        )
        .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
};


