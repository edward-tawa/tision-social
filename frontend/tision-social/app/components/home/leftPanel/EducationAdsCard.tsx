import React from 'react'
import { School, Book } from "lucide-react";
import Link from 'next/link';

const EducationAdsCard = () => {
    return (
        <div className="flex flex-col w-full text-text-color rounded-lg border border-gray-200 gap-2 px-3 py-2 bg-white">
            <Link href="#">
                <p className="flex items-center gap-2">
                    <School className="w-4 h-4 text-secondary" />
                    <span> Scholarships</span>
                </p>
            </Link>
            <Link href="#">
                <p className="flex items-center gap-2">
                    <span><Book className="w-4 h-4 text-secondary" /></span>
                    Get placed at the best Institutions of the world
                </p>
            </Link>
        </div>
    )
}

export default EducationAdsCard