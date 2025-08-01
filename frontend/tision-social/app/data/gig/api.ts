
//api.ts
import { GigInterface } from "@/app/data/gig/types";
import api from "@/app/data/utils/axios";
import { gigEndPoints } from "@/app/data/gig/endpoints";

export const createGig = async (gig: GigInterface): Promise<GigInterface> => {
    try {
        const res = await api.post(gigEndPoints.creategig, gig);
        return res.data;
    }

    catch (error: any) {
        throw new Error(error.message || "An error occurred while creating the Gig");
    }
}

export const getGig = async (gigId: number): Promise<GigInterface> => {
    try {
        const res = await api.get(gigEndPoints.getgig(gigId));
        return res.data;
    }
    catch (error: any) {
        throw new Error(error.message || "Error while fetching Gig");
    }
}

export const getGigs = async (userId: number): Promise<GigInterface[]> => {
    try {
        const res = await api.get(gigEndPoints.getgigs(userId));
        return res.data;
    }
    catch (error: any) {
        throw new Error(error.message || "Error while fetching Gigs");
    }
}

export const updateGig = async (gigId: number, gig: Partial<GigInterface>): Promise<GigInterface> => {
    try {
        const res = await api.patch(gigEndPoints.updategig(gigId), gig);
        return res.data
    }
    catch (error: any) {
        throw new Error(error.message || "Error while updating Gig");
    }
}


export const deleteGig = async (gigId: number): Promise<number> => {
    try {
        const res = await api.delete(gigEndPoints.deletegig(gigId));
        return res.data;
    }
    catch (error: any) {
        throw new Error(error.message || "Error while deleting Gig");
    }
}
