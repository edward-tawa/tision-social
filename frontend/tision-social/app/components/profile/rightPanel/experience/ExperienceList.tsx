"use client";
import React, { useState } from 'react';
import { ExperienceInterface } from "@/app/data/profile/experience/experienceSlice";
import { Plus } from "lucide-react";
import Link from "next/link";
import CreateExperience from '@/app/components/profile/rightPanel/experience/CreateExperience';
import Experience from '@/app/components/profile/rightPanel/experience/Experience';

interface ExperienceInterfaceProps {
    experiences: ExperienceInterface[]
}
const ExperienceList: React.FC<ExperienceInterfaceProps> = ({ experiences }) => {
    const [openCreate, setOpenCreate] = useState<boolean>(false)
    const handleClose = () => {
        setOpenCreate(!openCreate)
    }
    return (
        <div className="flex flex-col gap-1 bg-white rounded-lg px-2">
            <div className="flex flex-row items-center justify-between">
                <h1 className="font-bold text-text-color">Experience</h1>
                <div className="flex justify-end items-center">
                    <Link href="#">
                        <Plus className="w-6 h-6 text-text-color" onClick={handleClose} />
                    </Link>
                </div>

            </div>
            <div>
                {
                    experiences.map((experience, index) => (
                        <Experience key={index} {...experience} />
                    ))
                }
            </div>

            <div>
                {
                    openCreate && (
                        <CreateExperience handleClose={handleClose} />
                    )
                }
            </div>
        </div>
    )
}

export default ExperienceList