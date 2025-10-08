//bio api.ts
import api from "@/app/data/utils/axios";
import { BioInterface } from "@/app/data/profile/bio/types";
import { bioEndPoints } from "@/app/data/profile/bio/endpoints";



export const createBio = async (data: BioInterface): Promise<BioInterface> => {
    try {
        const res = await api.post(bioEndPoints.createbio, data);
        return res.data
    }

    catch (error: any) {
        throw new Error(error.message || "An error occurred while creating the bio");
    }
}

export const getBio = async (userId: number): Promise<BioInterface> => {
    try {
        const res = await api.get(bioEndPoints.getbio(userId));
        return res.data;
    }
    catch (error: any) {
        throw new Error(error.message || "An error occurred while fetching the bio");
    }
}

export const updateBio = async (bioId: number, userBio: Partial<BioInterface>): Promise<BioInterface> => {
    try {
        const res = await api.patch(bioEndPoints.updatebio(bioId), userBio);
        return res.data
    }
    catch (error: any) {
        throw new Error(error.message || "Error occured while updating bio")
    }
}

export const deleteBio = async (userId: number): Promise<number> => {
    try {
        const res = await api.delete(bioEndPoints.deletebio(userId));
        return res.status
    }

    catch (error: any) {
        throw new Error(error.message || "Error while deleting bio");
    }
}