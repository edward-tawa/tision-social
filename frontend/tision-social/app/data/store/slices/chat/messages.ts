import { messageUnion } from "@/app/data/message/types";
export const dummyMessages: Extract<messageUnion, { type: 'text' }>[] = [
    { id: 1, senderId: 2, receiverId: 1, timestamp: "2025-06-16T10:00:00Z", type: "text", content: { content: "Hey there!" } },
    { id: 2, senderId: 1, receiverId: 2, timestamp: "2025-06-16T10:01:00Z", type: "text", content: { content: "Hello! How are you?" } },
    { id: 3, senderId: 2, receiverId: 1, timestamp: "2025-06-16T10:02:00Z", type: "text", content: { content: "I'm good, thanks!" } },

    { id: 4, senderId: 3, receiverId: 1, timestamp: "2025-06-16T10:03:00Z", type: "text", content: { content: "Are you available for a meeting?" } },
    { id: 5, senderId: 1, receiverId: 3, timestamp: "2025-06-16T10:04:00Z", type: "text", content: { content: "Yes, I am." } },

    { id: 6, senderId: 4, receiverId: 1, timestamp: "2025-06-16T10:05:00Z", type: "text", content: { content: "Happy birthday!" } },
    { id: 7, senderId: 1, receiverId: 4, timestamp: "2025-06-16T10:06:00Z", type: "text", content: { content: "Thank you so much!" } },

    { id: 8, senderId: 5, receiverId: 1, timestamp: "2025-06-16T10:07:00Z", type: "text", content: { content: "Let's meet for lunch tomorrow." } },
    { id: 9, senderId: 1, receiverId: 5, timestamp: "2025-06-16T10:08:00Z", type: "text", content: { content: "Sure, what time?" } },

    { id: 10, senderId: 2, receiverId: 1, timestamp: "2025-06-16T10:09:00Z", type: "text", content: { content: "Did you check that file?" } },
    { id: 11, senderId: 1, receiverId: 2, timestamp: "2025-06-16T10:10:00Z", type: "text", content: { content: "Yes, looks good." } },

    { id: 12, senderId: 3, receiverId: 1, timestamp: "2025-06-16T10:11:00Z", type: "text", content: { content: "Can we review the document?" } },
    { id: 13, senderId: 1, receiverId: 3, timestamp: "2025-06-16T10:12:00Z", type: "text", content: { content: "Let's do it now." } },

    { id: 14, senderId: 4, receiverId: 1, timestamp: "2025-06-16T10:13:00Z", type: "text", content: { content: "How was your trip?" } },
    { id: 15, senderId: 1, receiverId: 4, timestamp: "2025-06-16T10:14:00Z", type: "text", content: { content: "Fantastic!" } },

    { id: 16, senderId: 5, receiverId: 1, timestamp: "2025-06-16T10:15:00Z", type: "text", content: { content: "See you at the event?" } },
    { id: 17, senderId: 1, receiverId: 5, timestamp: "2025-06-16T10:16:00Z", type: "text", content: { content: "Absolutely!" } },

    { id: 18, senderId: 2, receiverId: 1, timestamp: "2025-06-16T10:17:00Z", type: "text", content: { content: "What do you think of the new UI?" } },
    { id: 19, senderId: 1, receiverId: 2, timestamp: "2025-06-16T10:18:00Z", type: "text", content: { content: "Looks sleek!" } },

    { id: 20, senderId: 3, receiverId: 1, timestamp: "2025-06-16T10:19:00Z", type: "text", content: { content: "We should refactor that module." } },
    { id: 21, senderId: 1, receiverId: 3, timestamp: "2025-06-16T10:20:00Z", type: "text", content: { content: "Agreed." } },

    { id: 22, senderId: 4, receiverId: 1, timestamp: "2025-06-16T10:21:00Z", type: "text", content: { content: "Wanna join the game tonight?" } },
    { id: 23, senderId: 1, receiverId: 4, timestamp: "2025-06-16T10:22:00Z", type: "text", content: { content: "Count me in!" } },

    { id: 24, senderId: 5, receiverId: 1, timestamp: "2025-06-16T10:23:00Z", type: "text", content: { content: "Need help deploying." } },
    { id: 25, senderId: 1, receiverId: 5, timestamp: "2025-06-16T10:24:00Z", type: "text", content: { content: "I'll join in 10 mins." } },

    { id: 26, senderId: 2, receiverId: 1, timestamp: "2025-06-16T10:25:00Z", type: "text", content: { content: "Client approved it!" } },
    { id: 27, senderId: 1, receiverId: 2, timestamp: "2025-06-16T10:26:00Z", type: "text", content: { content: "Awesome job!" } },

    { id: 28, senderId: 3, receiverId: 1, timestamp: "2025-06-16T10:27:00Z", type: "text", content: { content: "Take a look at the new repo." } },
    { id: 29, senderId: 1, receiverId: 3, timestamp: "2025-06-16T10:28:00Z", type: "text", content: { content: "On it." } },

    { id: 30, senderId: 4, receiverId: 1, timestamp: "2025-06-16T10:29:00Z", type: "text", content: { content: "Final round tomorrow." } },
    { id: 31, senderId: 1, receiverId: 4, timestamp: "2025-06-16T10:30:00Z", type: "text", content: { content: "Good luck!" } },
];
