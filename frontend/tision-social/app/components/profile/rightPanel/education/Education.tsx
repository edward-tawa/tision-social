"use client";
import React, { useState } from "react";
import { EducationInterface } from "@/app/data/profile/education/educationSlice";
import UpdateEducation from "@/app/components/profile/rightPanel/education/UpdateEducation";
import { useDispatch } from 'react-redux';
import { deleteEducation } from '@/app/data/profile/education/educationSlice';
import { Pen, Trash } from "lucide-react";
import Link from "next/link";
import { Building2, UserCog, MapPin, CalendarPlus, CalendarCheck, FileText, Code2, } from "lucide-react";



//Experience Card where user experiences are listed
const Education: React.FC<EducationInterface> = ({
    id,
    institution,
    role,
    location,
    startDate,
    endDate,
    qualifications,
}) => {
    const [openUpdateEdu, setUpdateEdu] = useState<boolean>(false)
    const education = {
        id,
        institution,
        role,
        location,
        startDate,
        endDate,
        qualifications,
    }

    const dispatch = useDispatch();

    const handleUpdate = () => {
        setUpdateEdu(!openUpdateEdu);
    }

    const handleDelete = () => {

        const { id } = education
        dispatch(deleteEducation(id));
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
                        <span className="text-text-color text-md font-semibold">Institution</span>
                    </div>
                    <div className="px-6">{institution}</div>
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
                        <span className="text-text-color text-md font-semibold">Qualification</span>
                    </div>
                    <div className="px-6 flex flex-col gap-1">
                        {

                            qualifications.map((qualification, index) => (
                                <div key={index} className="flex items-center gap-1">
                                    <span className="text-lg text-blue-500">•</span>
                                    <span>{qualification}</span>
                                </div>
                            ))

                        }
                    </div>
                </div>


            </div>

            {
                openUpdateEdu && (
                    <UpdateEducation {...education} close={handleUpdate} />
                )

            }

        </div>
    )
}

export default Education