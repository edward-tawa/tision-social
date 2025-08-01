import React from 'react';
import { Building2, BadgeCheck } from "lucide-react"

const Institutions = () => {
    return (
        <div className="flex flex-col w-full text-text-color rounded-lg border border-gray-200 gap-2 px-2 py-2 bg-white">
            <p className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-secondary" />
                <span>Verified Institutions</span>
            </p>
            <p className="flex items-center gap-2">
                <BadgeCheck className="h-4 w-4 text-secondary" />
                <span>Intaking</span>
            </p>
        </div>
    )
}

export default Institutions