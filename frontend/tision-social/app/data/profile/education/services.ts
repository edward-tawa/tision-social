import { getEducation, createEducation, updateEducation, deleteEducation, getEducations } from "@/app/data/profile/education/api";

import { EducationInterface } from "@/app/data/profile/education/types";


export const getEducationService = async (exId: number) => {
    return await getEducation(exId);
}

export const getEducationsService = async (userId: number) => {
    return await getEducations(userId);
}

export const createEducationService = async (education: EducationInterface) => {
    return await createEducation(education);
}

export const updateEducationService = async (exId: number, education: Partial<EducationInterface>) => {
    return await updateEducation(exId, education);
}

export const deleteEducationService = async (exId: number) => {
    return await deleteEducation(exId);
}