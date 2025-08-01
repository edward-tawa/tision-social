import React from 'react'
import { InterestInterface } from "@/app/data/profile/interest/interestSlice";
import { deleteInterest } from '@/app/data/profile/interest/interestSlice';
import { useDispatch } from 'react-redux';
import { Trash, Heart } from "lucide-react";
import Link from "next/link";


const Interest: React.FC<InterestInterface> = ({ id, name }) => {
    const interest = { id, name }
    const dispatch = useDispatch()
    const handleDelete = () => {

        const { id } = interest;
        dispatch(deleteInterest(id));
    }
    return (
        <div className="flex flex-col px-1 gap-1 py-2 bg-white rounded-lg w-full text-text-color min-h-30">
            <div className="flex flex-row items-center justify-end">
                <Link href="#">
                    <Trash className="w-5 h-5 text-blue-500" onClick={handleDelete} />
                </Link>

            </div>
            <div className="flex flex-col w-full px-3 py-2 rounded-lg text-text-color">
                <div className="flex flex-row items-center gap-3"><Heart className="w-4 h-4 text-blue-500 fill" /><span>{name}</span></div>
            </div>
        </div>
    )
}

export default Interest