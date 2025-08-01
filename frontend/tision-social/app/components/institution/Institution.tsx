import React from 'react';
import { InstitutionInterface } from "@/app/data/institution/types";

interface InstitutionProps {
    institution: InstitutionInterface;
}

// id: number;
// name: string;
// description ?: string;
// logoUrl ?: string;
// websiteUrl ?: string;
// address ?: string;
// phone ?: string;
// email ?: string;
// createdAt: Date;
// updatedAt: Date;
// isActive: boolean;
// verified: boolean;


const Institution: React.FC<InstitutionProps> = ({ institution }) => {
    return (
        <div className="flex flex-col w-[40vw] h-[50vh] gap-2 p-2 bg-white rounded-lg cursor-pointer hover:z-50 hover:shadow-lg transition-shadow duration-300">
            <div className="font-bold text-2xl">{institution.name || ""}</div>
            <div className="font-bold text-2xl">{institution.description || ""}</div>
            <div className="font-bold text-2xl"><span>Posted on</span>{institution.address || ""}</div>
            <div className="font-bold text-2xl"><span>Send us an email</span>{institution.email || ""}</div>
            <div className="font-bold text-2xl">{institution.verified && (<p>Verified</p>)}</div>
        </div>
    )
}

export default Institution