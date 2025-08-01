//api.ts
import api from "@/app/data/utils/axios";
import { EducationInterface } from "@/app/data/profile/education/educationSlice";
import { educationEndPoints } from "@/app/data/profile/education/endpoints";

export const createEducation = async (education: EducationInterface): Promise<EducationInterface> => {
    try {
        const res = await api.post(educationEndPoints.createeducation, education);
        return res.data;
    }

    catch (error: any) {
        throw new Error(error.message || "An error occurred while creating the education");
    }
}

export const getEducation = async (eduId: number): Promise<EducationInterface> => {
    try {
        const res = await api.get(educationEndPoints.geteducation(eduId))
        return res.data;
    }
    catch (error: any) {
        throw new Error(error.message || "Error while fetching education");
    }
}

export const getEducations = async (userId: number): Promise<EducationInterface[]> => {
    try {
        const res = await api.get(educationEndPoints.geteducations(userId));
        return res.data;
    }
    catch (error: any) {
        throw new Error(error.message || "Error while fetching educations");
    }
}

export const updateEducation = async (eduId: number, education: Partial<EducationInterface>): Promise<EducationInterface> => {
    try {
        const res = await api.patch(educationEndPoints.updateeducation(eduId), education);
        return res.data
    }
    catch (error: any) {
        throw new Error(error.message || "Error while updating education");
    }
}


export const deleteEducation = async (eduId: number): Promise<number> => {
    try {
        const res = await api.delete(educationEndPoints.deleteeducation(eduId));
        return res.data;
    }
    catch (error: any) {
        throw new Error(error.message || "Error while deleting education");
    }
}
