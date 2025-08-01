//api.ts
import { JobInterface } from "@/app/data/job/types";
import api from "@/app/data/utils/axios";
import { jobEndPoints } from "@/app/data/job/endpoints";

export const createJob = async (job: JobInterface): Promise<JobInterface> => {
    try {
        const res = await api.post(jobEndPoints.createjob, job);
        return res.data;
    }

    catch (error: any) {
        throw new Error(error.message || "An error occurred while creating the Job");
    }
}

export const getJob = async (jobId: number): Promise<JobInterface> => {
    try {
        const res = await api.get(jobEndPoints.getjob(jobId));
        return res.data;
    }
    catch (error: any) {
        throw new Error(error.message || "Error while fetching Job");
    }
}

export const getJobs = async (userId: number): Promise<JobInterface[]> => {
    try {
        const res = await api.get(jobEndPoints.getjobs(userId));
        return res.data;
    }
    catch (error: any) {
        throw new Error(error.message || "Error while fetching Jobs");
    }
}

export const updateJob = async (jobId: number, job: Partial<JobInterface>): Promise<JobInterface> => {
    try {
        const res = await api.patch(jobEndPoints.updatejob(jobId), job)
        return res.data
    }
    catch (error: any) {
        throw new Error(error.message || "Error while updating Job");
    }
}


export const deleteJob = async (jobId: number): Promise<number> => {
    try {
        const res = await api.delete(jobEndPoints.deletejob(jobId));
        return res.data;
    }
    catch (error: any) {
        throw new Error(error.message || "Error while deleting Job");
    }
}
