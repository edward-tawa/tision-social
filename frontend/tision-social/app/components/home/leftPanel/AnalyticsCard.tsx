import React from 'react';
import { Eye, BarChart3 } from "lucide-react";
import Link from 'next/link';

const AnalyticsCard = () => {
    return (
        <div className="flex flex-col w-full text-text-color rounded-lg border border-gray-200 gap-2 px-3 py-2 bg-white">
            <Link href="">
                <p className="flex items-center gap-2">
                    <Eye className="h-4 w-4 text-secondary" />
                    Profile Views
                </p>
            </Link>
            <Link href="#">
                <p className="flex items-center gap-2 ">
                    <BarChart3 className="h-4 w-4 text-secondary" />
                    View Analytics
                </p>
            </Link>

        </div>
    )
}

export default AnalyticsCard