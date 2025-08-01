"use client";
import React from 'react'
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { ExperienceInterface } from '@/app/data/profile/experience/experienceSlice';
import { useDispatch } from 'react-redux';
import { addExperience } from '@/app/data/profile/experience/experienceSlice';
import { X, NotebookPen } from "lucide-react";

interface createExperienceProps {
    handleClose: () => void
}


const CreateExperience: React.FC<createExperienceProps> = ({ handleClose }) => {
    const [experience, setExperience] = useState<ExperienceInterface>({
        id: Date.now(),
        userId: Date.now(),
        company: '',
        role: '',
        location: '',
        startDate: '',
        endDate: '',
        description: [],
        technologies: [],
    },)
    const [techInput, setTechInput] = useState<string>("");
    const [descriptionInput, setDescriptionInput] = useState<string>("");
    const [technologies, setTechnologies] = useState<string[]>([]);
    const [descriptions, setDescriptions] = useState<string[]>([]);

    const dispatch = useDispatch();
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        // Handle input changes here //
        if (e.target.name === "technology") {
            setTechInput(e.target.value)
            return
        }

        if (e.target.name === "description") {
            setDescriptionInput(e.target.value)
            return
        }

        setExperience({ ...experience, [e.target.name]: e.target.value });

    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const currentExperience: ExperienceInterface = {
            ...experience,
            id: Date.now(),
            description: descriptions,
            technologies: technologies,
        }
        dispatch(addExperience(currentExperience));
        handleClose();
        setExperience({
            id: Date.now(),
            userId: Date.now(),
            company: '',
            role: '',
            location: '',
            startDate: '',
            endDate: '',
            description: [],
            technologies: [],
        });
        setDescriptions([]);
        setTechnologies([]);
        setTechInput("");
        setDescriptionInput("");
    }

    //setDescription and clear text area 
    const handleAddDescription = (e: React.MouseEvent) => {
        setDescriptions([...descriptions, descriptionInput])
        setDescriptionInput("")
    }

    //set Technology and clear textarea
    const handleAddTechnology = (e: React.MouseEvent) => {
        setTechnologies([...technologies, techInput])
        setTechInput("")
    }


    //for removing string from technologies array in UI
    const handleTechRemove = (e: React.MouseEvent, index: number) => {
        const Tech = technologies[index]
        const newTechnologies = technologies.filter(tech => tech !== Tech)
        setTechnologies(newTechnologies)

    }
    //for removing string from descriptions array in UI
    const handleDescriptionRemove = (e: React.MouseEvent, index: number) => {
        setDescriptions(descriptions.filter(desc => desc !== descriptions[index]))
    }
    return (
        <div className="fixed top-3/5 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-2 shadow-lg z-40 w-[90%] sm:w-full max-w-md mx-auto border border-gray-200 backdrop-blur-md max-h-[75vh] overflow-y-auto custom-scrollbar">


            <div className="flex justify-end">
                <X className="w-8 h-8 text-black cursor-pointer" onClick={handleClose} />
            </div>
            <h1 className="font-bold text-2xl flex flex-row gap-2 justify-center items-center">
                <NotebookPen className="w-6 h-6 text-secondary" />
                <span>
                    Create Experience
                </span>
            </h1>
            <form className="flex flex-col gap-1">
                <div className="flex flex-col gap-1">
                    <label>Company</label>
                    <input type="text"
                        className="border border-gray-200 w-full p-1 rounded-lg"
                        name="company"
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
                    <label>Describe Work Done</label>
                    <textarea
                        className="border border-gray-200 w-full p-1 rounded-lg"
                        name="description"
                        rows={2}
                        value={descriptionInput}
                        onChange={handleChange}
                    />
                    <div className="flex flex-row gap-2">
                        {
                            descriptions.map((description, index) => (
                                <div key={index} className="text-text-color text-sm font-semibold rounded-lg bg-blue-300 flex flex-col">
                                    <div
                                        className="flex justify-end p-[0.3px]"
                                        onClick={(e) => { handleDescriptionRemove(e, index) }}
                                    >
                                        <X className="w-3 h-3 text-black cursor-pointer" />
                                    </div>
                                    <div className="px-1">
                                        {description}
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <button
                        type="button"
                        className="rounded-lg px-3 text-white bg-secondary hover:bg-primary flex items-center gap-2 flex-row justify-center"
                        onClick={handleAddDescription}
                    >
                        <span>Add</span><Plus className="w-5 h-5 text-white" />
                    </button>
                </div>

                <div className="flex flex-col gap-1">
                    <label>Technologies</label>
                    <input
                        type="text"
                        className="border border-gray-200 w-full p-1 rounded-lg"
                        name="technology"
                        value={techInput}
                        onChange={handleChange}
                    />
                    <div className="flex flex-row gap-2">
                        {
                            technologies.map((tech, index) => (
                                <div key={index} className="text-text-color text-sm font-semibold rounded-lg bg-blue-300 flex flex-col">
                                    <div className="flex justify-end p-[0.3px]"
                                        onClick={(e) => { handleTechRemove(e, index) }}
                                    >
                                        <X className="w-3 h-3 text-black cursor-pointer"
                                        />
                                    </div>
                                    <div className="px-1">
                                        {tech}
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <button
                        type="button"
                        className="rounded-lg px-3 text-white bg-secondary hover:bg-primary flex items-center gap-2 flex-row justify-center"
                        onClick={handleAddTechnology}
                    >
                        <span>Add</span><Plus className="w-5 h-5 text-white" />
                    </button>
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors"
                    onClick={handleSubmit}
                >
                    Save Experience
                </button>

            </form>
        </div>
    )
}

export default CreateExperience