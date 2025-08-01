"use client";
import React from 'react'
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { EducationInterface } from "@/app/data/profile/education/educationSlice";
import { useDispatch } from 'react-redux';
import { addEducation } from '@/app/data/profile/education/educationSlice';
import { X, NotebookPen } from "lucide-react";

interface createEducationProps {
    handleClose: () => void
}


const CreateEducation: React.FC<createEducationProps> = ({ handleClose }) => {
    const [education, setEducation] = useState<EducationInterface>({
        id: '',
        institution: '',
        role: '',
        location: '',
        startDate: '',
        endDate: '',
        qualifications: [],
    },)
    const [qualificationsInput, setQualificationsInput] = useState<string>("");
    const [qualifications, setQualifications] = useState<string[]>([]);


    const dispatch = useDispatch();
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        // Handle input changes here //
        if (e.target.name === "qualifications") {
            setQualificationsInput(e.target.value)
            return
        }

        setEducation({ ...education, [e.target.name]: e.target.value });

    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const currentEducation: EducationInterface = {
            ...education,
            id: crypto.randomUUID(),
            qualifications: qualifications,
        }
        dispatch(addEducation(currentEducation));

        setEducation({
            id: '',
            institution: '',
            role: '',
            location: '',
            startDate: '',
            endDate: '',
            qualifications: [],
        });
        setQualifications([]);
        setQualificationsInput("");
        handleClose();
    }



    //set Qualification and clear textarea
    const handleAddTechnology = (e: React.MouseEvent) => {
        setQualifications([...qualifications, qualificationsInput])
        setQualificationsInput("")
    }


    //for removing string from qualifications array in UI
    const handleQualificationRemove = (e: React.MouseEvent, index: number) => {
        setQualifications(qualifications.filter(qualification => qualification !== qualifications[index]))
    }

    return (
        <div className="fixed top-3/5 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-2 shadow-lg z-40 w-[90%] sm:w-full max-w-md mx-auto border border-gray-200 backdrop-blur-md max-h-[75vh] overflow-y-auto custom-scrollbar">

            <div className="flex justify-end">
                <X className="w-8 h-8 text-black cursor-pointer" onClick={handleClose} />
            </div>
            <h1 className="font-bold text-2xl flex flex-row gap-2 justify-center items-center">
                <NotebookPen className="w-6 h-6 text-secondary" />
                <span>
                    Add Education
                </span>
            </h1>
            <form className="flex flex-col gap-1" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-1">
                    <label>Institution</label>
                    <input type="text"
                        className="border border-gray-200 w-full p-1 rounded-lg"
                        name="institution"
                        onChange={handleChange}
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label>Role</label>
                    <input type="text"
                        className="border border-gray-200 w-full p-1 rounded-lg"
                        name="role"
                        onChange={handleChange}

                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label>Location</label>
                    <input type="text"
                        className="border border-gray-200 w-full p-1 rounded-lg"
                        name="location"
                        onChange={handleChange}
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label>Start Date</label>
                    <input
                        type="date"
                        className="border border-gray-200 w-full p-1 rounded-lg"
                        name="startDate"
                        onChange={handleChange}
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label>End Date</label>
                    <input
                        type="date"
                        className="border border-gray-200 w-full p-1 rounded-lg"
                        name="endDate"
                        onChange={handleChange}
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label>Qualifications</label>
                    <input
                        type="text"
                        className="border border-gray-200 w-full p-1 rounded-lg"
                        name="qualifications"
                        value={qualificationsInput}
                        onChange={handleChange}
                    />
                    <div className="flex flex-row gap-2">
                        {
                            qualifications.map((qualification, index) => (
                                <div key={index} className="text-text-color text-sm font-semibold rounded-lg bg-blue-300 flex flex-col">
                                    <div className="flex justify-end p-[0.3px]"
                                        onClick={(e) => { handleQualificationRemove(e, index) }}
                                    >
                                        <X className="w-3 h-3 text-black cursor-pointer"
                                        />
                                    </div>
                                    <div className="px-1">
                                        {qualification}
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <button
                        type="button"
                        className="rounded-lg px-3 text-text-color bg-secondary hover:bg-primary flex flex-row items-center gap-2
                        w-full justify-center"
                        onClick={handleAddTechnology}
                    >
                        <span>Add</span><Plus className="w-5 h-5 text-gray-600" />
                    </button>
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors"
                >
                    Save Education
                </button>

            </form>
        </div>
    )
}

export default CreateEducation