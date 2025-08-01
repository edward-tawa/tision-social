import React, { useState } from 'react'
import { Pen, Trash } from "lucide-react";
import { useDispatch } from 'react-redux';
import { deleteProject } from '@/app/data/profile/project/projectSlice';
import { ProjectInterface } from '@/app/data/profile/project/projectSlice';
import {
    Heading,
    AlignLeft,
    UserCog,
    Link as Icon,
    CalendarCheck,
    MapPin,
    Loader
} from 'lucide-react';
import UpdateProject from "@/app/components/profile/rightPanel/projects/UpdateProject";
import Link from "next/link";

const Project: React.FC<ProjectInterface> = ({
    id,
    title,
    description,
    role,
    repolInk,
    startDate,
    endDate,
    isOngoing,
}) => {

    const dispatch = useDispatch()
    const [openUpdateProject, setUpdateProject] = useState<boolean>(false)
    const project = {
        id,
        title,
        description,
        role,
        repolInk,
        startDate,
        endDate,
        isOngoing
    }

    const handleUpdate = () => {
        setUpdateProject(!openUpdateProject);
    }

    const handleDelete = () => {
        const { id } = project;
        dispatch(deleteProject(id));
    }

    return (
        <div className="flex flex-col px-1 gap-3 py-2 bg-white rounded-lg w-full text-text-color min-h-30">
            <div className="flex flex-row items-center gap-5 justify-end">
                <Link href="#">
                    <Trash className="w-5 h-5 text-blue-500" onClick={handleDelete} />
                </Link>
                <Link href="#">
                    <Pen className="w-5 h-5 text-text-color" onClick={handleUpdate} />
                </Link>
            </div>
            <div className="flex flex-col w-full px-3 py-2 rounded-lg text-text-color">
                <div className="flex flex-col gap-1">
                    <div className="flex flex-row gap-2 items-center">
                        <Heading className="w-4 h-4 text-blue-500" />
                        <span className="text-text-color text-md font-semibold">Title</span>
                    </div>
                    <div className="px-6">{title}</div>
                </div>
                <div className="flex flex-col gap-1">
                    <div className="flex flex-row gap-2 items-center">
                        <AlignLeft className="w-4 h-4 text-blue-500" />
                        <span className="text-text-color text-md font-semibold">Description</span>
                    </div>
                    <div className="px-6">{description}</div>
                </div>
                <div className="flex flex-col gap-1">
                    <div className="flex flex-row gap-2 items-center">
                        <UserCog className="w-4 h-4 text-blue-500" />
                        <span className="text-text-color text-md font-semibold">Role</span>
                    </div>
                    <div className="px-6">{role}</div>
                </div>

                <div className="flex flex-col gap-1">
                    <div className="flex flex-row gap-2 items-center">
                        <Loader className="w-4 h-4 text-blue-500" />
                        <span className="text-text-color text-md font-semibold"> OnGoing </span>
                    </div>
                    <div className="px-6">{isOngoing}</div>
                </div>

                <div className="flex flex-col gap-1">
                    <div className="flex flex-row gap-2 items-center">
                        <Icon className="w-4 h-4 text-blue-500" />
                        <span className="text-text-color text-md font-semibold"> Repo LInk </span>
                    </div>
                    <div className="px-6">{repolInk}</div>
                </div>

                <div className="flex flex-col gap-1">
                    <div className="flex flex-row gap-2 items-center">
                        <CalendarCheck className="w-4 h-4 text-blue-500" />
                        <span className="text-text-color text-md font-semibold"> Start Date </span>
                    </div>
                    <div className="px-6">{startDate}</div>
                </div>

                <div className="flex flex-col gap-1">
                    <div className="flex flex-row gap-2 items-center">
                        <CalendarCheck className="w-4 h-4 text-blue-500" />
                        <span className="text-text-color text-md font-semibold"> End Date </span>
                    </div>
                    <div className="px-6">{endDate}</div>
                </div>



            </div>

            {
                openUpdateProject && (
                    <UpdateProject  {...project} close={handleUpdate} />
                )
            }
        </div>
    )
}

export default Project