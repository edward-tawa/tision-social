"use client";
import React, { useState } from "react";
import { X, NotebookPen } from "lucide-react";
import { Plus } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { updateEducation } from '@/app/data/profile/education/educationSlice';
import { EducationInterface } from "@/app/data/profile/education/educationSlice";

interface CloseProps {
    close: () => void;
}



type UpdateEducationProps = EducationInterface & CloseProps;
const UpdateEducation: React.FC<UpdateEducationProps> = ({
    id,
    institution,
    role,
    location,
    startDate,
    endDate,
    qualifications,
    close,
}) => {

    const dispatch = useDispatch();
    const [qualificationsInput, setQualificationsInput] = useState<string>("");
    const [qualificationss, setQualifications] = useState<string[]>(qualifications);
    const [education, setEducation] = useState<EducationInterface>({
        id,
        institution,
        role,
        location,
        startDate,
        endDate,
        qualifications,
    });



    //handle change on the fields
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (e.target.name === "qualications") {
            setQualificationsInput(e.target.value);
            return
        }


        const newUpdatedEdu = {
            ...education,
            qualifications: qualificationss,
            [e.target.name]: e.target.value
        }

        setEducation(newUpdatedEdu)

    }

    //add Qualification to the array
    const handleAddQualification = () => {
        if (qualificationsInput && !qualificationss.includes(qualificationsInput)) {
            setQualifications([...qualificationss, qualificationsInput]);
        }
        setQualificationsInput("");
    }

    //remove a Qualification from the local state array
    const handleQualificationRemove = (e: React.MouseEvent, index: number) => {
        setQualifications(qualificationss.filter(qualification => qualification !== qualificationss[index]));
    }

    //handle Submit and close modal and clear states
    const handleClose = (e: React.FormEvent) => {
        e.preventDefault()
        dispatch(updateEducation({
            ...education,
            qualifications: qualificationss,
        }));
        setQualifications([]);
        close()
    }





    return (
        <div className="fixed top-3/5 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-2 shadow-lg z-40 w-full max-w-md mx-auto border border-gray-200 backdrop-blur-md max-h-[75vh] overflow-y-auto custom-scrollbar">
            <div className="flex justify-end">
                <X className="w-8 h-8" onClick={close} />
            </div>
            <h1 className="font-bold text-2xl flex flex-row gap-2 justify-center items-center">
                <NotebookPen className="w-6 h-6 text-secondary" />
                <span>Edit Education</span>
            </h1>
            <form className="flex flex-col gap-1" onSubmit={handleClose}>

                <div className="flex flex-col gap-1">
                    <label>Institution</label>
                    <input
                        type="text"
                        className="border border-gray-200 w-full px-1 rounded-lg"
                        name="company"
                        value={education.institution}
                        onChange={handleChange}
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label>Role</label>
                    <input
                        type="text"
                        className="border border-gray-200 w-full px-1 rounded-lg"
                        name="role"
                        value={education.role}
                        onChange={handleChange}
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label>Location</label>
                    <input
                        type="text"
                        className="border border-gray-200 w-full px-1 rounded-lg"
                        name="location"
                        value={education.location}
                        onChange={handleChange}
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label>Start Date</label>
                    <input
                        type="text"
                        className="border border-gray-200 w-full px-1 rounded-lg"
                        name="startDate"
                        value={education.startDate}
                        onChange={handleChange}
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label>End Date</label>
                    <input
                        type="text"
                        className="border border-gray-200 w-full px-1 rounded-lg"
                        name="endDate"
                        value={education.endDate}
                        onChange={handleChange}
                    />
                </div>


                {/**Qualifications */}
                <div className="flex flex-col flex-wrap gap-1">
                    <label>Qualifications</label>
                    <input
                        type="text"
                        className="border border-gray-200 w-full p-1 rounded-lg"
                        name="qualications"
                        value={qualificationsInput}
                        onChange={handleChange}
                    />
                    <div className="flex flex-row gap-2">
                        {
                            qualificationss.map((qualification, index) => (
                                <div key={index} className="text-text-color text-sm font-semibold rounded-lg bg-blue-300 flex flex-col">
                                    <div className="flex justify-end p-[0.3px]"
                                        onClick={(e) => { handleQualificationRemove(e, index) }}
                                    >
                                        <X className="w-3 h-3 text-black cursor-pointer" />
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
                        className="rounded-lg px-3 text-text-color bg-secondary hover:bg-primary flex flex-row items-center gap-2 w-full justify-center"
                        onClick={handleAddQualification}
                    >
                        <span>Add</span><Plus className="w-5 h-5 text-gray-600" />
                    </button>
                </div>

                <button
                    type="submit"
                    className="w-full flex items-center justify-center bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors"
                >
                    Update Education
                </button>
            </form>
        </div>
    )
}

export default UpdateEducation