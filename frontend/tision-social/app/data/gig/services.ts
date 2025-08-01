import { getGig, createGig, updateGig, deleteGig, getGigs } from "@/app/data/gig/api";
import { GigInterface } from "@/app/data/gig/types";


export const getGigService = async (gigId: number) => {
    return await getGig(gigId);
}

export const getGigsService = async (userId: number) => {
    return await getGigs(userId);
}

export const createGigService = async (gig: GigInterface) => {
    return await createGig(gig);
}

export const updateGigService = async (gigId: number, gig: Partial<GigInterface>) => {
    return await updateGig(gigId, gig);
}

export const deleteGigService = async (gigId: number) => {
    return await deleteGig(gigId);
}