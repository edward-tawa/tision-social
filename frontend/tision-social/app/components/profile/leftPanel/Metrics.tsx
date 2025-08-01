import React from 'react';
import { Eye, PenLine, LayoutDashboard, BarChart2 } from "lucide-react";

const Metrics = () => {
    return (
        <div className="flex flex-col w-full text-text-color rounded py-2 bg-white gap-3">
            <h1 className="font-bold  flex flex-row gap-2"><BarChart2 className="w-5 h-5 text-secondary" /><p>Metrics</p></h1>
            <div className="flex flex-col gap-1 px-3">
                <h2>Profile views</h2>
                <p className="flex flex-row gap-2"><Eye className="w-5 h-5 text-secondary" />User Profile Views#</p>
                <h2>Posts</h2>
                <p className="flex flex-row gap-2"><PenLine className="w-5 h-5 text-secondary" />User Posts#</p>
                <h2>Projects</h2>
                <p className="flex flex-row gap-2"><LayoutDashboard className="w-5 h-5 text-secondary" />User Projects#</p>
            </div>
        </div>
    )
}

export default Metrics