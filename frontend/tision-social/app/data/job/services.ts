import { getJob, createJob, updateJob, deleteJob, getJobs } from "@/app/data/job/api";
import { JobInterface } from "@/app/data/job/types";


export const getJobService = async (jobId: number) => {
    return await getJob(jobId);
}

export const getJobsService = async (userId: number) => {
    return await getJobs(userId);
}

export const createJobService = async (job: JobInterface) => {
    return await createJob(job);
}

export const updateJobService = async (jobId: number, job: Partial<JobInterface>) => {
    return await updateJob(jobId, job);
}

export const deleteJobService = async (jobId: number) => {
    return await deleteJob(jobId);
}