//api.ts
import { ConnectionRequest } from "@/app/data/connection/types";
import api from "@/app/data/utils/axios";
import { connectionEndPoints } from "@/app/data/connection/endpoints";

export const createConnectionRequest = async (connectionRequest: ConnectionRequest): Promise<ConnectionRequest> => {
    try {
        const res = await api.post(connectionEndPoints.createconnection, connectionRequest);
        return res.data;
    }

    catch (error: any) {
        throw new Error(error.message || "An error occurred while creating the ConnectionRequest");
    }
}

export const getConnectionRequest = async (connectionRequestId: number): Promise<ConnectionRequest> => {
    try {
        const res = await api.get(connectionEndPoints.getconnection(connectionRequestId));
        return res.data;
    }
    catch (error: any) {
        throw new Error(error.message || "Error while fetching ConnectionRequest");
    }
}

export const getConnectionRequests = async (userId: number): Promise<ConnectionRequest[]> => {
    try {
        const res = await api.get(connectionEndPoints.getconnections(userId));
        return res.data;
    }
    catch (error: any) {
        throw new Error(error.message || "Error while fetching ConnectionRequests");
    }
}

export const updateConnectionRequest = async (connectionRequestId: number, connectionRequest: Partial<ConnectionRequest>): Promise<ConnectionRequest> => {
    try {
        const res = await api.patch(connectionEndPoints.updateconnection(connectionRequestId), connectionRequest);
        return res.data;
    }
    catch (error: any) {
        throw new Error(error.message || "Error while updating ConnectionRequest");
    }
}


export const deleteConnectionRequest = async (connectionRequestId: number): Promise<number> => {
    try {
        const res = await api.delete(connectionEndPoints.deleteconnection(connectionRequestId));
        return res.data;
    }
    catch (error: any) {
        throw new Error(error.message || "Error while deleting ConnectionRequest");
    }
}
