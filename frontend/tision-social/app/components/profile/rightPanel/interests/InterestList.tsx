"use client";
import { useState } from 'react'
import React from 'react';
import { Plus } from "lucide-react";
import Link from "next/link";
import { InterestInterface } from "@/app/data/profile/interest/interestSlice";
import CreateInterest from '@/app/components/profile/rightPanel/interests/CreateInterest';
import Interest from '@/app/components/profile/rightPanel/interests/Interest';

interface InterstInterfaceProps {
    interests: InterestInterface[]
}
const InterestList: React.FC<InterstInterfaceProps> = ({ interests }) => {
    const [openCreate, setOpenCreate] = useState<boolean>(false)
    const handleClose = () => {
        setOpenCreate(!openCreate)
    }
    return (
        <div className="flex flex-col gap-1 bg-white rounded-lg px-2">
            <div className="flex flex-row items-center justify-between">
                <h1 className="font-bold text-text-color">Interests</h1>
                <div className="flex justify-end items-center">
                    <Link href="#">
                        <Plus className="w-6 h-6 text-text-color" onClick={handleClose} />
                    </Link>
                </div>

            </div>
            <div>
                {
                    interests.map((interest, index) => (
                        <Interest key={index} {...interest} />
                    ))
                }
            </div>

            <div>
                {
                    openCreate && (
                        <CreateInterest close={handleClose} />
                    )
                }
            </div>
        </div>
    )
}

export default InterestList