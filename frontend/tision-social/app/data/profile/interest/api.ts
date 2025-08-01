//api.ts
import api from "@/app/data/utils/axios";
import { InterestInterface } from "@/app/data/profile/interest/interestSlice";
import { interestEndPoints } from "@/app/data/profile/interest/endpoints";

export const createInterest = async (interest: InterestInterface): Promise<InterestInterface> => {
    try {
        const res = await api.post(interestEndPoints.createinterest, interest);
        return res.data;
    }

    catch (error: any) {
        throw new Error(error.message || "An error occurred while creating the Interest");
    }
}

export const getInterest = async (interestId: number): Promise<InterestInterface> => {
    try {
        const res = await api.get(interestEndPoints.getinterest(interestId))
        return res.data;
    }
    catch (error: any) {
        throw new Error(error.message || "Error while fetching Interest");
    }
}

export const getInterests = async (userId: number): Promise<InterestInterface[]> => {
    try {
        const res = await api.get(interestEndPoints.getinterests(userId));
        return res.data;
    }
    catch (error: any) {
        throw new Error(error.message || "Error while fetching Interests");
    }
}

export const updateInterest = async (interestId: number, interest: Partial<InterestInterface>): Promise<InterestInterface> => {
    try {
        const res = await api.patch(interestEndPoints.updateinterest(interestId), interest)
        return res.data
    }
    catch (error: any) {
        throw new Error(error.message || "Error while updating Interest");
    }
}


export const deleteInterest = async (interestId: number): Promise<number> => {
    try {
        const res = await api.delete(interestEndPoints.deleteinterest(interestId));
        return res.data;
    }
    catch (error: any) {
        throw new Error(error.message || "Error while deleting Interest");
    }
}
