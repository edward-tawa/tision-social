import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addProject } from '@/app/data/profile/project/projectSlice';
import { ProjectInterface } from '@/app/data/profile/project/projectSlice';
import { X, NotebookPen } from "lucide-react";

interface createProjectProps {
    handleClose: () => void
}

const CreateProject: React.FC<createProjectProps> = ({ handleClose }) => {
    const [project, setProject] = useState<ProjectInterface>({
        id: "",
        title: "",
        description: "",
        role: "",
        repolInk: "",
        startDate: "",
        endDate: "",
        isOngoing: false,
    },)

    const dispatch = useDispatch();
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        // Handle input changes here //
        if (e.target.name === "isOngoing" && e.target.type === "checkbox") {
            const target = e.target as HTMLInputElement
            setProject({ ...project, isOngoing: target.checked })
            return;
        }

        setProject({ ...project, [e.target.name]: e.target.value });

    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const currentProject: ProjectInterface = {
            ...project,
            id: crypto.randomUUID(),
        }
        dispatch(addProject(currentProject));
        handleClose();
        setProject({
            id: "",
            title: "",
            description: "",
            role: "",
            repolInk: "",
            startDate: "",
            endDate: "",
            isOngoing: false,
        });
    }


    return (
        <div className="fixed top-3/5 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-2 shadow-lg z-40 w-[90%] sm:w-full max-w-md mx-auto border border-gray-200 backdrop-blur-md max-h-[75vh] overflow-y-auto custom-scrollbar">
            <div className="flex justify-end">
                <X className="w-8 h-8 text-black cursor-pointer" onClick={handleClose} />
            </div>
            <h1 className="font-bold text-2xl flex flex-row gap-2 justify-center items-center">
                <NotebookPen className="w-6 h-6 text-secondary" />
                <span>
                    Add Project
                </span>
            </h1>
            <form className="flex flex-col gap-1">
                <div className="flex flex-col gap-1">
                    <label>Project Title</label>
                    <input type="text"
                        className="border border-gray-200 w-full p-1 rounded-lg"
                        name="title"
                        onChange={handleChange}
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label>Project Description</label>
                    <textarea
                        className="border border-gray-200 w-full p-1 rounded-lg"
                        name="description"
                        rows={2}
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
                    <div className="flex flex-row items-center gap-2">
                        <input
                            type="checkbox"
                            name="isOngoing"
                            checked={project.isOngoing}
                            onChange={handleChange}
                        />
                        <label htmlFor="isOngoing">Is Ongoing?</label>
                    </div>
                </div>

                <div className="flex flex-col gap-1">
                    <label>Repo Link</label>
                    <input type="text"
                        className="border border-gray-200 w-full p-1 rounded-lg"
                        name="repolInk"
                        onChange={handleChange}
                    />

                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors"
                    onClick={handleSubmit}
                >
                    Save Project
                </button>

            </form>
        </div>
    )
}

export default CreateProject