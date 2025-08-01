import React from 'react';
import { ScholarshipInterface } from "@/app/data/scholarship/scholarshipSlice";

// interface ScholarshipInterface {
//     id: number;
//     posterId: number;
//     name: string;
//     description: string;
//     requirements: string[];
//     deadline: string;
//     amount: number;
//     isActive: boolean;
//     createdAt: string;
//     updatedAt: string;
// }

const Scholarship: React.FC<ScholarshipInterface> = ({ posterId, name, description, requirements, deadline, amount,
    isActive, createdAt, updatedAt
}) => {
    return (
        <div className="bg-white shadow-md rounded-lg flex flex-col gap-1 p-2">
            <div className="flex flex-row">
                {name}
            </div>
            <div className="flex flex-row">
                <p>{description}</p>
            </div>
            <div className="flex flex-wrap gap-2">
                {requirements.map((req, index) => (
                    <span
                        key={index}
                        className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded"
                    >
                        {req}
                    </span>
                ))}
            </div>

            <div className="flex flex-row gap-2">
                <span>Application Deadline</span>
                <span>{new Date(deadline).toLocaleDateString()}</span>
            </div>
            <div className="flex flex-row">
                <span>Posted on</span>
                <span>{new Date(createdAt).toLocaleDateString()}</span>
            </div>
        </div>
    )
}

export default Scholarship