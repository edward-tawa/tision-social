"use client";
import { useState } from 'react'
import React from 'react';
import { Plus } from "lucide-react";
import Link from "next/link";
import { EducationInterface } from "@/app/data/profile/education/educationSlice";
import Education from "@/app/components/profile/rightPanel/education/Education";
import CreateEducation from "@/app/components/profile/rightPanel/education/CreateEducation";


interface EducationListProps {
    educations: EducationInterface[]
}

const EducationList: React.FC<EducationListProps> = ({ educations }) => {
    const [openCreate, setOpenCreate] = useState<boolean>(false)
    const handleClose = () => {
        setOpenCreate(!openCreate)
    }
    return (
        <div className="flex flex-col bg-white text-text-color px-1 py-2 gap-1 rounded-lg">
            <div className="flex flex-row items-center justify-between">
                <h1 className="font-bold text-text-color">Education</h1>
                <div className="flex justify-end items-center">
                    <Link href="#">
                        <Plus className="w-6 h-6 text-text-color" onClick={handleClose} />
                    </Link>
                </div>
            </div>

            <div>
                <div>
                    {
                        educations.map((education, index) => (
                            <Education key={index} {...education} />
                        ))
                    }
                </div>

                {
                    openCreate && (
                        <CreateEducation handleClose={handleClose} />
                    )

                }
            </div>
        </div>
    )
}

export default EducationList