import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { RootState } from "@/app/data/store/store";
import { BioInterface } from "@/app/data/profile/bio/bioSlice";
import { setBio, updateBio } from "@/app/data/profile/bio/bioSlice";
import { X, NotebookPen } from "lucide-react";

interface CreateEventProps {
    close: () => void;
}
type UpdateBioProps = CreateEventProps & BioInterface

const UpdateBio: React.FC<UpdateBioProps> = ({ id, name, location, email, description, website, employmentStatus, close }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setBio({ id, name, location, email, description, website, employmentStatus }));
    }, []);

    const { bio } = useSelector((state: RootState) => state.bioSlice)
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {

        if (e.target.type === "checkbox" && e.target.name === 'employmentStatus') {
            const target = e.target as HTMLInputElement
            if (target.checked) {
                dispatch(setBio(
                    {
                        ...bio,
                        employmentStatus: [...(bio.employmentStatus || []), e.target.value]

                    }))

                return
            }
            else {
                dispatch(setBio({
                    ...bio,
                    employmentStatus: [...(bio.employmentStatus || []).filter(status => status !== e.target.value)]
                }))
                return
            }
        }
        const currentBio = {
            ...bio,
            [e.target.name]: e.target.value
        }
        dispatch(setBio(currentBio))
    }
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const currentBio: BioInterface = {
            ...bio,
        }
        dispatch(updateBio(currentBio))
        close()
    }

    return (
        <div className="fixed top-3/5 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md mx-auto bg-white rounded-lg p-2 backdrop-blur-md shadow-lg z-50 border border-gray-200">
            <div className="flex justify-end"><X className="w-8 h-8 text-black cursor-pointer" onClick={close} /></div>
            <h1 className="font-bold text-2xl flex flex-row gap-2 justify-center items-center">
                <NotebookPen className="w-6 h-6 text-secondary" />
                <span>
                    Update Bio
                </span>
            </h1>
            <form className="p-1 flex flex-col gap-2">
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-semibold text-text-color">Name</label>
                    <input type="text"
                        className="border border-gray-200 w-full p-1 rounded-lg"
                        onChange={handleChange}
                        name="name"
                        value={bio.name}

                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-sm font-semibold text-text-color">Location</label>
                    <input type="text"
                        className="border border-gray-200 w-full p-1 rounded-lg"
                        onChange={handleChange}
                        name="location"
                        value={bio.location}
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-sm font-semibold text-text-color">Description</label>
                    <textarea rows={2}
                        className="border border-gray-200 w-full p-1 rounded-lg"
                        onChange={handleChange}
                        name="description"
                        value={bio.description}
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-sm font-semibold text-text-color">Email</label>
                    <input type="email"
                        className="border border-gray-200 w-full p-1 rounded-lg"
                        onChange={handleChange}
                        name="email"
                        value={bio.email}
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-sm font-semibold text-text-color">Website</label>
                    <input type="text"
                        className="border border-gray-200 w-full p-1 rounded-lg"
                        onChange={handleChange}
                        name="website"
                        value={bio.website}
                    />
                </div>


                <div className="flex flex-col gap-1">
                    <label className="text-sm font-semibold text-text-color">Employment</label>
                    <div className="flex gap-4">
                        <label className="flex items-center gap-1 text-sm">
                            <input
                                type="checkbox"
                                name="employmentStatus"
                                value="student"
                                checked={bio.employmentStatus?.includes("student")}
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
                                checked={bio.employmentStatus?.includes("working")}
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

export default UpdateBio