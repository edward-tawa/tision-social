"use client";
import React from 'react'
import { useState, useRef, useEffect } from "react";
import Button from "@/app/components/buttons/Button";
import { Pencil, Trash2 } from "lucide-react";
import { JobInterface } from "@/app/data/job/jobSlice";
import { deleteJob } from "@/app/data/job/jobSlice";
import { useDispatch, useSelector } from 'react-redux';
import UpdateJob from "@/app/components/admin/job/UpdateJob";
import { selectAllJobs } from "@/app/data/store/slices/job/jobSelectors"




const JobsTable = () => {
    const jobsFromStore = useSelector(selectAllJobs);
    const dispatch = useDispatch();
    const [allJobs, setAllJobs] = useState<JobInterface[]>(jobsFromStore);
    const [jobUpdate, setJobUpdate] = useState<JobInterface | null>(null);
    const [currentJobs, setCurrentJobs] = useState<JobInterface[]>(jobsFromStore);
    const searchRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setAllJobs(jobsFromStore)
        setCurrentJobs(jobsFromStore)
    }, [jobsFromStore])

    //dispatched an action to redux store to delete a job using its id
    const handleJobDelete = (jobId: number) => {
        dispatch(deleteJob(jobId))
    }

    //function to handle job update
    const handleJobUpdate = (job: JobInterface) => {
        setJobUpdate(job);
    }


    const searchFilter = () => {
        const searchTerm = searchRef.current?.value.toLowerCase() || "";
        if (searchTerm) {
            const filteredJobs = jobsFromStore.filter(job =>
                searchTerm === job.title.toLowerCase() ||
                searchTerm === job.location.toLowerCase() ||
                searchTerm === job.category.toLowerCase()
            )
            setCurrentJobs(filteredJobs);
        }
        else {
            setCurrentJobs(jobsFromStore);
        }
    }

    return (
        <div className="bg-white rounded-lg px-2 py-2 text-text-color mx-w-screen overflow-x-hidden">
            <div className="mb-5"><h2 className="font-bold">Jobs</h2></div>
            <div className="flex flex-row items-center w-full gap-5 mb-5">
                <div><Button text="Create Job" size="small" color="secondary" className="rounded-full" /></div>
                <div><input type="text" name="search" placeholder="search" className="rounded-md focus:outline-none text-text-color bg-primary py-1" ref={searchRef} onChange={searchFilter} /></div>

            </div>
            <table className="w-full table-auto">
                <thead>
                    <tr className="border-b">
                        <th className="px-4 py-2 text-left">Title</th>
                        <th className="px-4 py-2 text-left">Location</th>
                        <th className="px-4 py-2 text-left">Category</th>
                        <th className="px-4 py-2 text-left">Duration</th>
                        <th className="px-4 py-2 text-left">Date Posted</th>
                        <th className="px-4 py-2 text-left">Expiry Date</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        currentJobs.map((job, index) => (
                            <tr key={job.id} className="border-b">
                                <td className="px-4 py-2">{job.title}</td>
                                <td className="px-4 py-2">{job.location}</td>
                                <td className="px-4 py-2">{job.category}</td>
                                <td className="px-4 py-2">{job.duration}</td>
                                <td className="px-4 py-2">{job.datePosted}</td>
                                <td className="px-4 py-2">{job.expiryDate}</td>
                                <td className="px-4 py-2 flex gap-2">
                                    <Pencil className="w-4 h-4 text-blue-500 hover:text-blue-700 cursor-pointer"
                                        onClick={() => handleJobUpdate(job)} />
                                    <Trash2 className="w-4 h-4 text-red-500 hover:text-red-700 cursor-pointer"
                                        onClick={() => handleJobDelete(job.id)} />
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            {
                jobUpdate && (
                    <UpdateJob  {...jobUpdate} close={() => setJobUpdate(null)} />
                )
            }
        </div>
    )
}

export default JobsTable