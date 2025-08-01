//api.ts
import { MessageUnion } from "@/app/data/message/types";
import api from "@/app/data/utils/axios";
import { messageEndPoints } from "@/app/data/message/endpoints";

export const createMessage = async (message: MessageUnion): Promise<MessageUnion> => {
    try {
        const res = await api.post(messageEndPoints.createmessage, message);
        return res.data;
    }

    catch (error: any) {
        throw new Error(error.message || "An error occurred while creating the Message");
    }
}

export const getMessage = async (messageId: number): Promise<MessageUnion> => {
    try {
        const res = await api.get(messageEndPoints.getmessage(messageId));
        return res.data;
    }
    catch (error: any) {
        throw new Error(error.message || "Error while fetching Message");
    }
}

export const getMessages = async (userId: number): Promise<MessageUnion[]> => {
    try {
        const res = await api.get(messageEndPoints.getmessages(userId));
        return res.data;
    }
    catch (error: any) {
        throw new Error(error.message || "Error while fetching Messages");
    }
}

export const updateMessage = async (messageId: number, message: Partial<MessageUnion>): Promise<MessageUnion> => {
    try {
        const res = await api.patch(messageEndPoints.updatemessage(messageId), message);
        return res.data
    }
    catch (error: any) {
        throw new Error(error.message || "Error while updating Message");
    }
}


export const deleteMessage = async (messageId: number): Promise<number> => {
    try {
        const res = await api.delete(messageEndPoints.deletemessage(messageId));
        return res.data;
    }
    catch (error: any) {
        throw new Error(error.message || "Error while deleting Message");
    }
}
