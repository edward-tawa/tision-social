import React from 'react'
import { ConnectionRequest } from "@/app/data/connection/connectionSlice";
import ConnectionsList from "@/app/components/connections/ConnectionsList";

const dummyConnections: ConnectionRequest[] = [
    {
        id: "req-1",
        senderId: "john_doe",
        receiverId: "user_me",
        status: "pending",
        timestamp: "2025-06-29T08:30:00Z",
    },
    {
        id: "req-2",
        senderId: "jane_smith",
        receiverId: "user_me",
        status: "pending",
        timestamp: "2025-06-29T09:00:00Z",
    },
    {
        id: "req-3",
        senderId: "mark77",
        receiverId: "user_me",
        status: "pending",
        timestamp: "2025-06-29T09:15:00Z",
    },
    {
        id: "req-4",
        senderId: "lucy_zen",
        receiverId: "user_me",
        status: "pending",
        timestamp: "2025-06-29T09:45:00Z",
    },
    {
        id: "req-5",
        senderId: "dan_the_dev",
        receiverId: "user_me",
        status: "pending",
        timestamp: "2025-06-29T10:00:00Z",
    },
];
const page = () => {
    return (
        <div className="bg-primary w-full h-full flex flex-col gap-2 p-2">
            <h1 className="font-bold text-2xl w-full max-w-md mx-auto">Connections</h1>
            <div className="cursor-pointer">
                <ConnectionsList connections={dummyConnections} />
            </div>
        </div>
    )
}

export default page