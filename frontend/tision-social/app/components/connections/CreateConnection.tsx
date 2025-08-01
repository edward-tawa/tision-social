//create connection
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/app/store/store';
import { createConnectionRequestThunk } from '@/app/data/connection/thunk';
import { PublicUser } from '@/app/data/user/types';
import { ConnectionRequest } from '@/app/data/connection/types';

interface CreateConnectionProps {
    receiver: PublicUser;
    sender: PublicUser;
}

const CreateConnection: React.FC<CreateConnectionProps> = ({ receiver, sender }) => {
    const dispatch = useDispatch<AppDispatch>();
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);

    const handleSendRequest = async () => {
        setLoading(true);
        try {
            const connectionRequest: ConnectionRequest = {
                id: Date.now(),
                senderId: sender.id,
                receiverId: receiver.id,
                senderName: sender.username,
                receiverName: receiver.username,
                status: "pending",
                timestamp: new Date().toISOString(),
            };

            await dispatch(createConnectionRequestThunk(connectionRequest));
            setSent(true);
        } catch (error: any) {
            console.error("Failed to send connection request:", error?.message || error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            onClick={handleSendRequest}
            disabled={loading || sent}
            className="bg-blue-500 text-text-color px-4 py-2 rounded disabled:opacity-50 cursor-pointer"
        >
            {loading ? "Sending..." : sent ? "Sent" : "Connect"}
        </button>
    );
};

export default CreateConnection;
