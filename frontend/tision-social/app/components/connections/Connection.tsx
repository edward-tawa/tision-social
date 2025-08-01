import React from 'react'
import { ConnectionRequest } from "@/app/data/connection/types";
import Button from "@/app/components/buttons/Button";
import { useDispatch } from "react-redux";
import { updateConnectionRequestThunk } from "@/app/data/connection/thunk";
import { AppDispatch } from '@/app/store/store';

interface ConnectionProps {
    connection: ConnectionRequest;
}

const Connection: React.FC<ConnectionProps> = ({ connection }) => {
    const dispatch = useDispatch<AppDispatch>();
    const handleAccept = async () => {
        try {
            const updatedConnection: Partial<ConnectionRequest> = {
                ...connection,
                status: "accepted",
            }
            await dispatch(updateConnectionRequestThunk({ connectionRequestId: connection.id, connectionRequest: updatedConnection }));
        }
        catch (error: any) {
            console.error("Failed to reject connection:", error.message);
        }

    }

    const handleReject = async () => {
        try {
            const updatedConnection: Partial<ConnectionRequest> = {
                ...connection,
                status: "rejected",
            }
            await dispatch(updateConnectionRequestThunk({ connectionRequestId: connection.id, connectionRequest: updatedConnection }));
        }
        catch (error: any) {
            console.error("Failed to reject connection:", error.message);
        }

    }
    return (
        <div className="w-full max-w-md mx-auto bg-white rounded-lg p-2 flex flex-col gap-1 shadow-md">
            <div className="flex flex-col gap-2 ">
                <p>Request from {connection.senderName} || "" at {connection.timestamp || ""}</p>
                <p>{connection.status || ""}</p>
            </div>
            <div className="flex flex-row gap-4">
                <Button size="small" color="secondary" text="Accept" className="rounded-full cursor-pointer" onClick={handleAccept} />
                <Button size="small" text="Reject" className="bg-red-500 rounded-full cursor-pointer" onClick={handleReject} />
            </div>
        </div>
    )
}

export default Connection