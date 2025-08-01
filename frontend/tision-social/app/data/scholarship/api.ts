//api.ts
import { ScholarshipInterface } from "@/app/data/scholarship/types";
import { scholarshipEndPoints } from "@/app/data/scholarship/endpoints";
import api from "@/app/data/utils/axios";

export const createScholarship = async (scholarship: ScholarshipInterface): Promise<ScholarshipInterface> => {
    try {
        const res = await api.post(scholarshipEndPoints.createscholarship, scholarship);
        return res.data;
    }

    catch (error: any) {
        throw new Error(error.message || "An error occurred while creating the Scholarship");
    }
}

export const getScholarship = async (scholarshipId: number): Promise<ScholarshipInterface> => {
    try {
        const res = await api.get(scholarshipEndPoints.getscholarship(scholarshipId));
        return res.data;
    }
    catch (error: any) {
        throw new Error(error.message || "Error while fetching Scholarship");
    }
}

export const getScholarships = async (userId: number): Promise<ScholarshipInterface[]> => {
    try {
        const res = await api.get(scholarshipEndPoints.getscholarships(userId));
        return res.data;
    }
    catch (error: any) {
        throw new Error(error.message || "Error while fetching Scholarships");
    }
}

export const updateScholarship = async (scholarshipId: number, scholarship: Partial<ScholarshipInterface>): Promise<ScholarshipInterface> => {
    try {
        const res = await api.patch(scholarshipEndPoints.updatescholarship(scholarshipId), scholarship);
        return res.data
    }
    catch (error: any) {
        throw new Error(error.message || "Error while updating Scholarship");
    }
}


export const deleteScholarship = async (scholarshipId: number): Promise<number> => {
    try {
        const res = await api.delete(scholarshipEndPoints.deletescholarship(scholarshipId));
        return res.data;
    }
    catch (error: any) {
        throw new Error(error.message || "Error while deleting Scholarship");
    }
}
