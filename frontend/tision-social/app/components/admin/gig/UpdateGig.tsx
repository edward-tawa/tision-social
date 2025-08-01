import React from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import { GigInterface } from "@/app/data/gig/gigSlice";
import { useDispatch } from 'react-redux';
import { updateGig } from "@/app/data/gig/gigSlice";

interface CloseProps {

    close: () => void
}
type UpdateGigProps = GigInterface & CloseProps;


//Function to create Gig
const UpdateGig: React.FC<UpdateGigProps> = ({ id, title, location, category, duration, datePosted, expiryDate, close }) => {
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors } } = useForm<GigInterface>({
        defaultValues: {
            title, location, category, duration, datePosted, expiryDate
        },
    })

    const onSubmit: SubmitHandler<GigInterface> = (data) => {
        const gig: GigInterface = {
            id,
            title: data.title,
            location: data.location,
            category: data.category,
            duration: data.duration,
            datePosted: data.datePosted,
            expiryDate: data.expiryDate,
        }
        dispatch(updateGig(gig))
        close()
    }

    return (
        <div className="fixed top-3/5 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-2 shadow-lg z-40 w-full max-w-md mx-auto border border-gray-200 backdrop-blur-md max-h-[75vh] overflow-y-auto custom-scrollbar">
            <h2 className="font-bold">Update Gig</h2>
            <form className="flex flex-col gap-3 text-text-color" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-row items-center gap-4">
                    <label htmlFor="Job Title">Gig Title</label>
                    <input type="text" placeholder="Job Title" {...register("title")} />
                </div>

                <div className="flex flex-row items-center gap-4">
                    <label htmlFor="Location">Location</label>
                    <input type="text" placeholder="Location" {...register("location")} />
                </div>

                <div className="flex flex-row items-center gap-4">
                    <label htmlFor="Category">Category</label>
                    <input type="text" placeholder="Category" {...register("category")} />
                </div>

                <div className="flex flex-row items-center gap-4">
                    <label htmlFor="Duration">Duration</label>
                    <input type="text" placeholder="Duration" {...register("duration")} />
                </div>

                <div className="flex flex-row items-center gap-4">
                    <label htmlFor="Duration">Date Posted</label>
                    <input type="date"  {...register("datePosted")} />
                </div>

                <div className="flex flex-row items-center gap-4">
                    <label htmlFor="Duration">Expiry Date</label>
                    <input type="date"  {...register("expiryDate")} />
                </div>




                <button
                    type="submit"
                    className="w-full flex items-center justify-center bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors"
                >
                    Update Gig
                </button>

            </form>
        </div>
    )
}

export default UpdateGig