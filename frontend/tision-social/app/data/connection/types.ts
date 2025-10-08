export interface ConnectionRequest {
    id: number;
    sender: number;
    receiver: number;
    senderName: string;
    receiverName: string;
    status: "pending" | "canceled" | "accepted" | "rejected";
    timestamp: string;
}