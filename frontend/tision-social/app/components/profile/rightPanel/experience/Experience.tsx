"use client";
import React, { useState } from "react";
import { ExperienceInterface } from "@/app/data/profile/experience/experienceSlice";
import UpdateExperience from "@/app/components/profile/rightPanel/experience/UpdateExperience";
import { useDispatch } from 'react-redux';
import { deleteExperience } from '@/app/data/profile/experience/experienceSlice';
import { Pen, Trash } from "lucide-react";
import Link from "next/link";
import { Building2, UserCog, MapPin, CalendarPlus, CalendarCheck, FileText, Code2, } from "lucide-react";



//Experience Card where user experiences are listed
const Experience: React.FC<ExperienceInterface> = ({
    id,
    userId,
    company,
    role,
    location,
    startDate,
    endDate,
    description,
    technologies,
}) => {
    const [openUpdateExp, setUpdateExp] = useState<boolean>(false)
    const experience = {
        id,
        userId,
        company,
        role,
        location,
        startDate,
        endDate,
        description,
        technologies,
    }

    const dispatch = useDispatch()

    const handleUpdate = () => {
        setUpdateExp(!openUpdateExp);
    }

    const handleDelete = () => {

        const { id } = experience;
        dispatch(deleteExperience(id));
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
                        <Building2 className="w-4 h-4 text-blue-500" />
                        <span className="text-text-color text-md font-semibold">Company</span>
                    </div>
                    <div className="px-6">{company}</div>
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
                        <MapPin className="w-4 h-4 text-blue-500" />
                        <span className="text-text-color text-md font-semibold">Location</span>
                    </div>
                    <div className="px-6">{location}</div>
                </div>

                <div className="flex flex-col gap-1">
                    <div className="flex flex-row gap-2 items-center">
                        <CalendarPlus className="w-4 h-4 text-blue-500" />
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

                <div className="flex flex-col gap-1">
                    <div className="flex flex-row gap-2 items-center">
                        <FileText className="w-4 h-4 text-blue-500" />
                        <span className="text-text-color text-md font-semibold">Description</span>
                    </div>
                    <div className="px-6 flex flex-col gap-1">
                        {

                            description.map((desc, index) => (
                                <div key={index} className="flex items-center gap-1">
                                    <span className="text-lg text-blue-500">•</span>
                                    <span>{desc}</span>
                                </div>
                            ))

                        }
                    </div>
                </div>
                <div className="flex flex-col gap-1">
                    <div className="flex flex-row gap-2 items-center">
                        <Code2 className="w-4 h-4 text-blue-500" />
                        <span className="text-text-color text-md font-semibold">Technologies</span>
                    </div>
                    <div className="px-6 flex flex-row gap-1">
                        {
                            technologies.map((tech, index) => (
                                <div key={index} className="flex items-center gap-1">
                                    <span className="text-lg text-blue-500">•</span>
                                    <span>{tech}</span>
                                </div>
                            ))
                        }
                    </div>
                </div>


            </div>

            {
                openUpdateExp && (
                    <UpdateExperience  {...experience} close={handleUpdate} />
                )
            }


        </div>
    )
}

export default Experience