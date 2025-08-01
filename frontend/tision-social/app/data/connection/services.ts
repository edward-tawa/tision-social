import { getConnectionRequest, createConnectionRequest, updateConnectionRequest, deleteConnectionRequest, getConnectionRequests } from "@/app/data/connection/api";
import { ConnectionRequest } from "@/app/data/connection/types";


export const getConnectionRequestService = async (connectionRequestId: number) => {
    return await getConnectionRequest(connectionRequestId);
}

export const getConnectionRequestsService = async (userId: number) => {
    return await getConnectionRequests(userId);
}

export const createConnectionRequestService = async (connectionRequest: ConnectionRequest) => {
    return await createConnectionRequest(connectionRequest);
}

export const updateConnectionRequestService = async (connectionRequestId: number, connectionRequest: Partial<ConnectionRequest>) => {
    return await updateConnectionRequest(connectionRequestId, connectionRequest);
}

export const deleteConnectionRequestService = async (connectionRequestId: number) => {
    return await deleteConnectionRequest(connectionRequestId);
}