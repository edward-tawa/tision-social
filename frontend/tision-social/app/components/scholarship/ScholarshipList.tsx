import React from 'react'
import Scholarship from "@/app/components/scholarship/Scholarship";
import { ScholarshipInterface } from "@/app/data/scholarship/scholarshipSlice";

interface ScholarshipListProps {
    scholarships: ScholarshipInterface[]
}

const ScholarshipList: React.FC<ScholarshipListProps> = ({ scholarships }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {scholarships.map((scholarship) => (
                <div key={scholarship.id}>
                    <Scholarship {...scholarship} />
                </div>
            ))}
        </div>
    )
}

export default ScholarshipList