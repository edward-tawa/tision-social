import { JobInterface } from "@/app/data/job/types";
import { RootState } from "@/app/data/store/store";


export const selectAllJobs = (state: RootState): JobInterface[] => {
    const { jobIds, byId } = state.jobSlice.jobs;
    return jobIds.map(jobId => byId[jobId]);
}

export const selectJobById = (state: RootState, jobId: number): JobInterface | undefined => {
    const { jobIds, byId } = state.jobSlice.jobs;
    if (!jobIds.includes(jobId)) return undefined;
    return byId[jobId];
}

export const selectJobsByCategory = (state: RootState, category: string): JobInterface[] => {
    return selectAllJobs(state).filter(job => job.category.toLowerCase() === category.toLowerCase());
}

export const selectJobsByTitle = (state: RootState, title: string): JobInterface[] => {
    return selectAllJobs(state).filter(job => job.title.toLowerCase() === title.toLowerCase());
}

export const selectJobsByDuration = (state: RootState, duration: string): JobInterface[] => {
    return selectAllJobs(state).filter(job => job.duration.toLowerCase() === duration.toLowerCase());
}

export const selectJobsByLocation = (state: RootState, location: string): JobInterface[] => {
    return selectAllJobs(state).filter(job => job.location.toLowerCase() === location.toLowerCase());
}

export const selectByMonthPosted = (state: RootState, month: string): JobInterface[] => {
    return selectAllJobs(state).filter(job => {
        const datePosted = new Date(job.datePosted);
        return datePosted.toLocaleString('default', { month: 'long' }).toLowerCase() === month.toLowerCase();
    })
}

export const selectCurrentJob = (state: RootState): JobInterface => {
    return state.jobSlice.job
}