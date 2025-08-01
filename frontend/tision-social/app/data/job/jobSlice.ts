import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { JobInterface } from "@/app/data/job/types";
import {
    getJobThunk,
    getJobsThunk,
    createJobThunk,
    updateJobThunk,
    deleteJobThunk,
} from "@/app/data/job/thunk";

interface NormalizedJobs {
    byId: Record<number, JobInterface>;
    jobIds: number[];
}

interface JobState {
    job: JobInterface;
    jobs: NormalizedJobs;
    loading: boolean;
    error?: string;
}

export const initialState: JobState = {
    job: {
        id: Date.now(),
        title: "",
        location: "",
        category: "",
        datePosted: "",
        expiryDate: "",
        duration: "",
    },
    jobs: {
        byId: {},
        jobIds: []
    },
    loading: false,
    error: undefined,
}

const jobSlice = createSlice({
    name: "jobSlice",
    initialState,
    reducers: {
        setJob: (state, action: PayloadAction<JobInterface>) => {
            state.job = action.payload;
        },
        addJob: (state, action: PayloadAction<JobInterface>) => {
            const jobId = action.payload.id;
            if (!state.jobs.byId[jobId]) {
                state.jobs.byId[jobId] = action.payload;
                state.jobs.jobIds.push(jobId);
            }
        },

        addJobs: (state, action: PayloadAction<JobInterface[]>) => {
            action.payload.forEach((job) => {
                const jobId = job.id
                //if the job already exists skip adding it.
                if (state.jobs.byId[jobId]) return

                state.jobs.byId[jobId] = job;
                state.jobs.jobIds.push(jobId);

            })
        },


        updateJob: (state, action: PayloadAction<JobInterface>) => {
            const jobId = action.payload.id;
            if (state.jobs.byId[jobId]) {
                state.jobs.byId[jobId] = action.payload;
            }
        },

        deleteJob: (state, action: PayloadAction<number>) => {
            if (state.jobs.jobIds.includes(action.payload)) {
                delete state.jobs.byId[action.payload];
                state.jobs.jobIds = state.jobs.jobIds.filter(id => id !== action.payload);
            }
        },
        resetJob: (state) => {
            state.job = {
                id: Date.now(),
                title: "",
                location: "",
                category: "",
                datePosted: "",
                expiryDate: "",
                duration: "",
            };
            state.jobs = {
                byId: {},
                jobIds: []
            };
        }
    },
    extraReducers: (builder) => {
        builder
            // GET SINGLE JOB
            .addCase(getJobThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(getJobThunk.fulfilled, (state, action) => {
                const job = action.payload;
                state.job = job;
                if (!state.jobs.byId[job.id]) {
                    state.jobs.byId[job.id] = job;
                    state.jobs.jobIds.push(job.id);
                }
                state.loading = false;
            })
            .addCase(getJobThunk.rejected, (state, action) => {
                state.error = action.payload as string || "Error occurred while fetching job";
                state.loading = false;
            })

            // GET ALL JOBS
            .addCase(getJobsThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(getJobsThunk.fulfilled, (state, action) => {
                action.payload.forEach(job => {
                    if (!state.jobs.byId[job.id]) {
                        state.jobs.byId[job.id] = job;
                        state.jobs.jobIds.push(job.id);
                    }
                });
                state.loading = false;
            })
            .addCase(getJobsThunk.rejected, (state, action) => {
                state.error = action.payload as string || "Error occurred while fetching jobs";
                state.loading = false;
            })

            // CREATE JOB
            .addCase(createJobThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(createJobThunk.fulfilled, (state, action) => {
                const job = action.payload;
                if (!state.jobs.byId[job.id]) {
                    state.jobs.byId[job.id] = job;
                    state.jobs.jobIds.push(job.id);
                }
                state.loading = false;
            })
            .addCase(createJobThunk.rejected, (state, action) => {
                state.error = action.payload as string || "Error occurred while creating job";
                state.loading = false;
            })

            // UPDATE JOB
            .addCase(updateJobThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateJobThunk.fulfilled, (state, action) => {
                const job = action.payload;
                if (state.jobs.byId[job.id]) {
                    state.jobs.byId[job.id] = job;
                }
                if (state.job?.id === job.id) {
                    state.job = job;
                }
                state.loading = false;
            })
            .addCase(updateJobThunk.rejected, (state, action) => {
                state.error = action.payload as string || "Error occurred while updating job";
                state.loading = false;
            })

            // DELETE JOB
            .addCase(deleteJobThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteJobThunk.fulfilled, (state, action) => {
                const id = action.payload;
                delete state.jobs.byId[id];
                state.jobs.jobIds = state.jobs.jobIds.filter(jid => jid !== id);
                if (state.job?.id === id) {
                    state.job = initialState.job;
                }
                state.loading = false;
            })
            .addCase(deleteJobThunk.rejected, (state, action) => {
                state.error = action.payload as string || "Error occurred while deleting job";
                state.loading = false;
            });
    }

})

export const { setJob, addJob, addJobs, updateJob, deleteJob, resetJob } = jobSlice.actions;
export default jobSlice.reducer;