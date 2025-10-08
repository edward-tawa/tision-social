import { getExperience, createExperience, updateExperience, deleteExperience, getExperiences } from "@/app/data/profile/experience/api";

import { ExperienceInterface } from "@/app/data/profile/experience/types";



export const getExperienceService = async (exId: number) => {
    return await getExperience(exId);
}

export const getExperiencesService = async (userId: number) => {
    return await getExperiences(userId);
}

export const createExperienceService = async (experience: ExperienceInterface) => {
    return await createExperience(experience);
}

export const updateExperienceService = async (exId: number, experience: Partial<ExperienceInterface>) => {
    return await updateExperience(exId, experience);
}

export const deleteExperienceService = async (exId: number) => {
    return await deleteExperience(exId);
}