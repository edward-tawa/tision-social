import { getScholarship, createScholarship, updateScholarship, deleteScholarship, getScholarships } from "@/app/data/scholarship/api";
import { ScholarshipInterface } from "@/app/data/scholarship/types";


export const getScholarshipService = async (scholarshipId: number) => {
    return await getScholarship(scholarshipId);
}

export const getScholarshipsService = async (userId: number) => {
    return await getScholarships(userId);
}

export const createScholarshipService = async (scholarship: ScholarshipInterface) => {
    return await createScholarship(scholarship);
}

export const updateScholarshipService = async (scholarshipId: number, scholarship: Partial<ScholarshipInterface>) => {
    return await updateScholarship(scholarshipId, scholarship);
}

export const deleteScholarshipService = async (scholarshipId: number) => {
    return await deleteScholarship(scholarshipId);
}