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
            <div className="flex flex-row">
                {requirements}
            </div>
            <div className="flex flex-row gap-2">
                <span>Application Deadline</span>
                {deadline}
            </div>
            <div className="flex flex-row">
                <span>Posted on</span>
                {createdAt}
            </div>
        </div>
    )
}

export default Scholarship