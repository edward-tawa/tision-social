import { getInstitution, createInstitution, updateInstitution, deleteInstitution, getInstitutions } from "@/app/data/institution/api";

import { InstitutionInterface } from "@/app/data/institution/types";


export const getInstitutionService = async (institutionId: number) => {
    return await getInstitution(institutionId);
}

export const getInstitutionsService = async (userId: number) => {
    return await getInstitutions(userId);
}

export const createInstitutionService = async (institution: InstitutionInterface) => {
    return await createInstitution(institution);
}

export const updateInstitutionService = async (institutionId: number, institution: Partial<InstitutionInterface>) => {
    return await updateInstitution(institutionId, institution);
}

export const deleteInstitutionService = async (institutionId: number) => {
    return await deleteInstitution(institutionId);
}