//api.ts
import api from "@/app/data/utils/axios";
import { InstitutionInterface } from "@/app/data/institution/types";
import { institutionEndPoints } from "@/app/data/institution/endpoints";

export const createInstitution = async (institution: InstitutionInterface): Promise<InstitutionInterface> => {
    try {
        const res = await api.post(institutionEndPoints.createinstitution, institution);
        return res.data;
    }

    catch (error: any) {
        throw new Error(error.message || "An error occurred while creating the Institution");
    }
}

export const getInstitution = async (institutionId: number): Promise<InstitutionInterface> => {
    try {
        const res = await api.get(institutionEndPoints.getinstitution(institutionId))
        return res.data;
    }
    catch (error: any) {
        throw new Error(error.message || "Error while fetching Institution");
    }
}

export const getInstitutions = async (userId: number): Promise<InstitutionInterface[]> => {
    try {
        const res = await api.get(institutionEndPoints.getinstitutions(userId))
        return res.data;
    }
    catch (error: any) {
        throw new Error(error.message || "Error while fetching Institutions");
    }
}

export const updateInstitution = async (institutionId: number, institution: Partial<InstitutionInterface>): Promise<InstitutionInterface> => {
    try {
        const res = await api.patch(institutionEndPoints.updateinstitution(institutionId), institution);
        return res.data
    }
    catch (error: any) {
        throw new Error(error.message || "Error while updating Institution");
    }
}


export const deleteInstitution = async (institutionId: number): Promise<number> => {
    try {
        const res = await api.delete(institutionEndPoints.deleteinstitution(institutionId));
        return res.data;
    }
    catch (error: any) {
        throw new Error(error.message || "Error while deleting Institution");
    }
}
