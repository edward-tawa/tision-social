export interface ConnectionRequest {
    id: number;
    senderId: number;
    receiverId: number;
    senderName: string;
    receiverName: string;
    status: "pending" | "canceled" | "accepted" | "rejected";
    timestamp: string;
}