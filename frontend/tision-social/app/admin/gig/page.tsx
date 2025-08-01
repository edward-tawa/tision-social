import React from 'react'
import GigsTable from "@/app/components/admin/gig/GigsTable"
import MobileCardView from "@/app/components/admin/job/MobileCardView"

const page = () => {
    const gigs = [
        {
            id: 1,
            title: "Frontend Developer",
            location: "Remote",
            category: "IT",
            duration: "3 months",
            datePosted: "2025-06-01",
            expiryDate: "2025-06-30",
        },
        {
            id: 2,
            title: "Backend Developer",
            location: "Lagos",
            category: "Tech",
            duration: "6 months",
            datePosted: "2025-06-02",
            expiryDate: "2025-07-02",
        }
    ];
    return (
        <>
            <div className="hidden sm:inline-block px-1 py-1 rounded-lg">
                <GigsTable gigs={gigs} />
            </div>
            <div className="sm:hidden px-1 py-1 rounded-lg">
                <MobileCardView gigs={gigs} />
            </div>
        </>

    )
}

export default page