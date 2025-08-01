//api.ts
import api from "@/app/data/utils/axios";
import { ExperienceInterface } from "@/app/data/profile/experience/experienceSlice";
import { experienceEndPoints } from "@/app/data/profile/experience/endpoints";

export const createExperience = async (experience: ExperienceInterface): Promise<ExperienceInterface> => {
    try {
        const res = await api.post(experienceEndPoints.createexperience, experience);
        return res.data;
    }

    catch (error: any) {
        throw new Error(error.message || "An error occurred while creating the experience");
    }
}

export const getExperience = async (exId: number): Promise<ExperienceInterface> => {
    try {
        const res = await api.get(experienceEndPoints.getexperience(exId))
        return res.data;
    }
    catch (error: any) {
        throw new Error(error.message || "Error while fetching experience");
    }
}

export const getExperiences = async (userId: number): Promise<ExperienceInterface[]> => {
    try {
        const res = await api.get(experienceEndPoints.getexperiences(userId))
        return res.data;
    }
    catch (error: any) {
        throw new Error(error.message || "Error while fetching experiences");
    }
}

export const updateExperience = async (exId: number, experience: Partial<ExperienceInterface>): Promise<ExperienceInterface> => {
    try {
        const res = await api.patch(experienceEndPoints.updateexperience(exId), experience)
        return res.data
    }
    catch (error: any) {
        throw new Error(error.message || "Error while updating experience");
    }
}


export const deleteExperience = async (exId: number): Promise<number> => {
    try {
        const res = await api.delete(experienceEndPoints.deleteexperience(exId));
        return res.data;
    }
    catch (error: any) {
        throw new Error(error.message || "Error while deleting experience");
    }
}
