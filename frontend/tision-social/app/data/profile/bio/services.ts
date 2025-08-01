//services.ts
import { getBio, createBio, updateBio, deleteBio } from '@/app/data/profile/bio/api';
import { BioInterface } from "@/app/data/profile/bio/bioSlice";


export const getBioService = async (userId: number) => {
    return await getBio(userId);
}

export const createBioService = async (userBio: BioInterface) => {
    return await createBio(userBio);
}

export const updateBioService = async (bioId: number, userBio: Partial<BioInterface>) => {
    return await updateBio(bioId, userBio);
}

export const deleteBioService = async (userId: number) => {
    return await deleteBio(userId);
}