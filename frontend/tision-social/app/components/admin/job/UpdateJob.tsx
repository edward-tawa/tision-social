import React from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import { JobInterface } from "@/app/data/job/jobSlice";
import { updateJob } from "@/app/data/job/jobSlice";
import { useDispatch } from 'react-redux';

interface closeProps {
    close: () => void;
}

type UpdateProps = JobInterface & closeProps

const UpdateJob: React.FC<UpdateProps> = ({ id, title, location, category, duration, datePosted, expiryDate, close }) => {

    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<JobInterface>({
        defaultValues: {
            title, location, category, duration, datePosted, expiryDate
        }
    })

    const onSubmit: SubmitHandler<JobInterface> = (data) => {
        const job: JobInterface = {
            id,
            title: data.title,
            location: data.location,
            category: data.category,
            datePosted: data.datePosted,
            expiryDate: data.expiryDate,
            duration: data.duration,
        }
        dispatch(updateJob(job))
        close()
    }
    return (
        <div className="fixed top-3/5 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-2 shadow-lg z-40 w-full max-w-md mx-auto border border-gray-200 backdrop-blur-md max-h-[75vh] overflow-y-auto custom-scrollbar">
            <h2 className="font-bold">Create Job</h2>
            <form className="flex flex-col gap-3 text-text-color" onSubmit={handleSubmit(onSubmit)}>

                <div className="flex flex-col items-center gap-1">
                    <label htmlFor="Job Title">Job Title</label>
                    <input type="text" placeholder="Job Title"    {...register("title", { required: "Enter job title" })} />
                </div>


                <div className="flex flex-col items-center gap-1">
                    <label htmlFor="Location">Location</label>
                    <input type="text" placeholder="Location" {...register("location", { required: "Enter job location" })} />
                </div>

                <div className="flex flex-col items-center gap-1">
                    <label htmlFor="Category">Category</label>
                    <input type="text" placeholder="Category" {...register("category", { required: "Enter job category" })} />
                </div>

                <div className="flex flex-col items-center gap-1">
                    <label htmlFor="Duration">Duration</label>
                    <input type="text" placeholder="Duration" {...register("duration", { required: "Enter job duration" })} />
                </div>

                <div className="flex flex-col items-center gap-1">
                    <label htmlFor="Duration">Date Posted</label>
                    <input type="date"  {...register("datePosted", { required: "Enter job date posted" })} />
                </div>

                <div className="flex flex-col items-center gap-1">
                    <label htmlFor="Duration">Expiry Date</label>
                    <input type="date" {...register("expiryDate", { required: "Enter job expiry date" })} />
                </div>


                <button
                    type="submit"
                    className="w-full flex items-center justify-center bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors"
                >
                    {
                        isSubmitting ? "Submitting" : "Update Job"
                    }
                </button>
            </form>
        </div>
    )
}

export default UpdateJob