import React from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import { GigInterface } from "@/app/data/gig/gigSlice";
import { addGig } from "@/app/data/gig/gigSlice";
import { useDispatch } from 'react-redux';

interface closeProps {
    close: () => void;
}
//Function to create Gig
const CreateGig: React.FC<closeProps> = ({ close }) => {
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<GigInterface>()
    const onSubmit: SubmitHandler<GigInterface> = (data) => {
        const gig: GigInterface = {
            id: Date.now(),
            title: data.title,
            location: data.location,
            category: data.category,
            duration: data.duration,
            datePosted: data.datePosted,
            expiryDate: data.expiryDate,
        }
        dispatch(addGig(gig))
        close()
    }

    return (
        <div className="fixed top-3/5 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-2 shadow-lg z-40 w-[90%] sm:w-full max-w-md mx-auto border border-gray-200 backdrop-blur-md max-h-[75vh] overflow-y-auto custom-scrollbar">

            <h2 className="font-bold">Create Gig</h2>
            <form className="flex flex-col gap-1 text-text-color" onSubmit={handleSubmit(onSubmit)}>

                <div className="flex flex-col items-center gap-1">
                    <label htmlFor="Gig Title">Gig Title</label>
                    <input type="text" placeholder="Job Title" className="rounded-lg px-1 focus:outline-none focus:border-0 bg-primary" {...register("title", {
                        required: "Title is required",

                    })} />
                </div>
                {errors.title && (<div className="text-red-500">{errors.title.message}</div>)}

                <div className="flex flex-col items-center gap-1">
                    <label htmlFor="Location">Location</label>
                    <input type="text" placeholder="Location" className="rounded-lg px-1 focus:outline-none focus:border-0 bg-primary" {...register("location", {
                        required: "Location is required",

                    })} />
                </div>
                {errors.location && (<div className="text-red-500">{errors.location.message}</div>)}

                <div className="flex flex-col items-center gap-1">
                    <label htmlFor="Category">Category</label>
                    <input type="text" placeholder="Category" className="rounded-lg px-1 focus:outline-none focus:border-0 bg-primary" {...register("category", {
                        required: "Category is required",

                    })} />
                </div>
                {errors.category && (<div className="text-red-500">{errors.category.message}</div>)}

                <div className="flex flex-col items-center gap-1">
                    <label htmlFor="Duration">Duration</label>
                    <input type="text" placeholder="Duration" className="rounded-lg px-1 focus:outline-none focus:border-0 bg-primary" {...register("duration", {
                        required: "Duration is required",

                    })} />
                </div>
                {errors.duration && (<div className="text-red-500">{errors.duration.message}</div>)}

                <div className="flex flex-col items-center gap-1">
                    <label htmlFor="Duration">Date Posted</label>
                    <input type="date" {...register("datePosted", {
                        required: "Date posted is required",

                    })} />
                </div>
                {errors.datePosted && (<div className="text-red-500">{errors.datePosted.message}</div>)}

                <div className="flex flex-col items-center gap-1">
                    <label htmlFor="Duration">Expiry Date</label>
                    <input type="date" {...register("expiryDate", {
                        required: "Expiry date is required",

                    })} />
                </div>
                {errors.expiryDate && (<div className="text-red-500">{errors.expiryDate.message}</div>)}





                <button
                    type="submit"
                    className="w-full flex items-center justify-center bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors"
                >
                    {
                        isSubmitting ? "Submitting" : "Create Gig"
                    }
                </button>

            </form>
        </div>
    )
}

export default CreateGig