import React from 'react';
import LeftPanel from '../components/profile/leftPanel/LeftPanel';
import Gig from "../components/gig/Gig";
import GigFilter from "../components/gig/GigFilter";

const page = () => {
    return (
        <div className="grid grid-cols-12 text-text-color">
            <div className="hidden sm:inline-block sm:col-span-4 md:col-span-4 lg-col-span-4">
                <LeftPanel />
            </div>
            <div className="col-span-12 sm:col-span-8 md:col-span-8 lg-col-span-8 flex flex-col gap-3 px-2">
                <GigFilter />
                <Gig />
            </div>
        </div>
    )
}

export default page