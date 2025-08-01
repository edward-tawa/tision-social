import { MessageUnion } from "@/app/data/message/types";
export const dummyMessages: Extract<MessageUnion, { type: "text" }>[] = [
    // Chat between 1 and 2
    {
        id: 1,
        type: "text",
        senderId: 1,
        receiverId: 2,
        timestamp: "2025-07-26T09:00:00Z",
        content: { content: "Hey 2, how are you?" },
    },
    {
        id: 2,
        type: "text",
        senderId: 2,
        receiverId: 1,
        timestamp: "2025-07-26T09:01:00Z",
        content: { content: "I’m good! You?" },
    },
    {
        id: 3,
        type: "text",
        senderId: 1,
        receiverId: 2,
        timestamp: "2025-07-26T09:02:00Z",
        content: { content: "Doing great!" },
    },

    // Chat between 1 and 3
    {
        id: 4,
        type: "text",
        senderId: 3,
        receiverId: 1,
        timestamp: "2025-07-26T09:10:00Z",
        content: { content: "Yo 1!" },
    },
    {
        id: 5,
        type: "text",
        senderId: 1,
        receiverId: 3,
        timestamp: "2025-07-26T09:11:00Z",
        content: { content: "Hey 3!" },
    },
    {
        id: 6,
        type: "text",
        senderId: 3,
        receiverId: 1,
        timestamp: "2025-07-26T09:12:00Z",
        content: { content: "Wanna catch up later?" },
    },

    // Chat between 1 and 4
    {
        id: 7,
        type: "text",
        senderId: 4,
        receiverId: 1,
        timestamp: "2025-07-26T09:20:00Z",
        content: { content: "Hello 1!" },
    },
    {
        id: 8,
        type: "text",
        senderId: 1,
        receiverId: 4,
        timestamp: "2025-07-26T09:21:00Z",
        content: { content: "Hi 4!" },
    },
    {
        id: 9,
        type: "text",
        senderId: 4,
        receiverId: 1,
        timestamp: "2025-07-26T09:22:00Z",
        content: { content: "How's your day going?" },
    },

    // Chat between 2 and 3
    {
        id: 10,
        type: "text",
        senderId: 1,
        receiverId: 4,
        timestamp: "2025-07-26T09:30:00Z",
        content: { content: "Hey 3, you free later?" },
    },
    {
        id: 11,
        type: "text",
        senderId: 3,
        receiverId: 1,
        timestamp: "2025-07-26T09:31:00Z",
        content: { content: "Yeah sure." },
    },
    {
        id: 12,
        type: "text",
        senderId: 1,
        receiverId: 3,
        timestamp: "2025-07-26T09:32:00Z",
        content: { content: "Cool, let’s meet up." },
    },

    // Extra messages in 1-2 chat
    {
        id: 13,
        type: "text",
        senderId: 2,
        receiverId: 1,
        timestamp: "2025-07-26T09:40:00Z",
        content: { content: "By the way, are you coming tonight?" },
    },
    {
        id: 14,
        type: "text",
        senderId: 1,
        receiverId: 2,
        timestamp: "2025-07-26T09:41:00Z",
        content: { content: "Yes! I’ll be there." },
    },
    {
        id: 15,
        type: "text",
        senderId: 2,
        receiverId: 1,
        timestamp: "2025-07-26T09:42:00Z",
        content: { content: "Awesome!" },
    },
];
