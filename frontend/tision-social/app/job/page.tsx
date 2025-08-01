import React from 'react';
import LeftPanel from '@/app/components/profile/leftPanel/LeftPanel';
import Job from "@/app/components/job/Job";
import JobFilter from "@/app/components/job/JobFilter";

const page = () => {
    return (
        <div className="grid grid-cols-12 text-text-color">
            <div className="hidden sm:inline-block sm:col-span-3 md:col-span-3 lg-col-span-3">
                <LeftPanel />
            </div>
            <div className="col-span-12 sm:col-span-8 md:col-span-8 lg-col-span-8 flex flex-col gap-3 px-2">
                <JobFilter />
                <Job />
            </div>
        </div>
    )
}

export default page