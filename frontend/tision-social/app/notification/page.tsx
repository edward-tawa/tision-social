import React from 'react'
import NotificationCard from '@/app/components/notification/NotificationCard';
import { NotificationUnion } from '@/app/components/notification/NotificationCard';
import NotificationList from '@/app/components/notification/NotificationList';

const dummyNotifications: NotificationUnion[] = [
    {
        id: "1",
        read: false,
        timestamp: "2025-06-14T09:00:00Z",
        actor: { id: 101, name: "Alice", avatar: "https://example.com/avatar1.png" },
        type: "like",
        data: {
            postId: 555,
            userId: 200,
            likerId: 101,
        },
    },
    {
        id: "2",
        read: true,
        timestamp: "2025-06-14T08:30:00Z",
        actor: { id: 102, name: "Bob", avatar: "https://example.com/avatar2.png" },
        type: "comment",
        data: {
            postId: 556,
            userId: 200,
            commenterId: 102,
            commentId: 789,
        },
    },
    {
        id: "3",
        read: false,
        timestamp: "2025-06-13T20:15:00Z",
        actor: { id: 103, name: "Charlie", avatar: "https://example.com/avatar3.png" },
        type: "friendRequest",
        data: {
            userId: 200,
            requesterId: 103,
        },
    },
    {
        id: "4",
        read: true,
        timestamp: "2025-06-12T17:45:00Z",
        actor: { id: 104, name: "Diana", avatar: "https://example.com/avatar4.png" },
        type: "info",
        data: {
            userId: 200,
            content: "Your password will expire in 3 days.",
        },
    },
    {
        id: "5",
        read: false,
        timestamp: "2025-06-11T14:10:00Z",
        actor: { id: 105, name: "Eve", avatar: "https://example.com/avatar5.png" },
        type: "message",
        data: {
            userId: 200,
            senderId: 105,
            content: "Hey, are you available for a call?",
        },
    },
];




const page = () => {
    return (
        <div className="flex flex-col w-full h-full items-center">
            <h1 className="font-bold text-lg">Notifications</h1>
            <div className="flex flex-col w-full max-w-2xl gap-4">
                <NotificationList notifications={dummyNotifications} />
            </div>
        </div>
    )
}

export default page