import React from 'react'
import JobsTable from '@/app/components/admin/job/JobsTable'
import MobileCardView from '@/app/components/admin/job/MobileCardView'

const page = () => {
    const jobs = [
        {
            id: 1,
            title: "Frontend Developer",
            location: "Remote",
            category: "IT",
            duration: "3 months",
            datePosted: "2025-06-01",
            dateExpired: "2025-06-30",
        },
        {
            id: 2,
            title: "Backend Developer",
            location: "Lagos",
            category: "Tech",
            duration: "6 months",
            datePosted: "2025-06-02",
            dateExpired: "2025-07-02",
        }
    ];
    return (
        <>
            <div className="hidden sm:inline-block px-1 py-1 rounded-lg">
                <JobsTable   />
            </div>
            <div className="sm:hidden px-1 py-1 rounded-lg">
                <MobileCardView jobs={jobs} />
            </div>
        </>

    )
}

export default page