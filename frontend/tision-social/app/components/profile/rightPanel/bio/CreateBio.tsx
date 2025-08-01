import React from 'react'
import { BioInterface } from "@/app/data/profile/bio/bioSlice";
import { setBio, addBio } from "@/app/data/profile/bio/bioSlice";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from "@/app/data/store/store";
import { X, NotebookPen } from "lucide-react";

interface createBioProps {
    handleClose: () => void
}
const CreateBio: React.FC<createBioProps> = ({ handleClose }) => {
    const dispatch = useDispatch()
    const { bio } = useSelector((state: RootState) => state.bioSlice)
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;

        if (type === "checkbox" && name === "employmentStatus") {
            const target = e.target as HTMLInputElement;
            const updatedStatuses = target.checked
                ? [...(bio.employmentStatus || []), value]
                : (bio.employmentStatus || []).filter(status => status !== value);

            dispatch(setBio({
                ...bio,
                employmentStatus: updatedStatuses,
            }));

            return;
        }

        dispatch(setBio({
            ...bio,
            [name]: value,
        }));
    };


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const currentBio: BioInterface = {
            ...bio,
            id: crypto.randomUUID(),
        }
        dispatch(addBio(currentBio));
        handleClose()
    }
    return (
        <div className="fixed top-3/5 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md mx-auto bg-white rounded-lg p-2 backdrop-blur-md shadow-lg z-50 border border-gray-200">
            <div className="flex justify-end"><X className="w-8 h-8 text-black cursor-pointer" onClick={handleClose} /></div>
            <h1 className="font-bold text-2xl flex flex-row gap-2 justify-center items-center">
                <NotebookPen className="w-6 h-6 text-secondary" />
                <span>
                    Create Bio
                </span>
            </h1>
            <form className="p-1 flex flex-col gap-2">
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-semibold text-text-color">Name</label>
                    <input type="text" placeholder="Enter your name"
                        className="border border-gray-200 w-full p-1 rounded-lg"
                        onChange={handleChange}
                        name="name" />
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-sm font-semibold text-text-color">Location</label>
                    <input type="text"
                        placeholder="Enter your location"
                        className="border border-gray-200 w-full p-1 rounded-lg"
                        onChange={handleChange}
                        name="location"
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-sm font-semibold text-text-color">Description</label>
                    <textarea rows={2}
                        placeholder="Enter your Bio Description"
                        className="border border-gray-200 w-full p-1 rounded-lg"
                        onChange={handleChange}
                        name="description"
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-sm font-semibold text-text-color">Email</label>
                    <input type="email"
                        placeholder="Email"
                        className="border border-gray-200 w-full p-1 rounded-lg"
                        onChange={handleChange}
                        name="email" />
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-sm font-semibold text-text-color">Website</label>
                    <input type="text"
                        placeholder="Website URL"
                        className="border border-gray-200 w-full p-1 rounded-lg"
                        onChange={handleChange}
                        name="website" />
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-sm font-semibold text-text-color">Employment</label>
                    <div className="flex gap-4">
                        <label className="flex items-center gap-1 text-sm">
                            <input
                                type="checkbox"
                                name="employmentStatus"
                                value="student"
                                onChange={handleChange}
                                className="checkbox checkbox-sm"
                            />
                            Student
                        </label>
                        <label className="flex items-center gap-1 text-sm">
                            <input
                                type="checkbox"
                                name="employmentStatus"
                                value="working"
                                onChange={handleChange}
                                className="checkbox checkbox-sm"
                            />
                            Working
                        </label>
                    </div>
                </div>


                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors 
                    cursor-pointer hover:bg-primary hover:text-text-color"
                    onClick={handleSubmit}
                >
                    Save Bio
                </button>
            </form>

        </div>
    )
}

export default CreateBio