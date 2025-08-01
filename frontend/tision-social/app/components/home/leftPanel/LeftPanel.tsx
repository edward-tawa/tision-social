import React from 'react'
import ProfileCard from './ProfileCard'
import EventsCard from './EventsCard'
import AnalyticsCard from './AnalyticsCard'
import EducationAdsCard from './EducationAdsCard'
import SideFooter from "@/app/components/footer/SideFooter";

const LeftPanel = () => {
    return (
        <div className="sm:flex sm:flex-col rounded h-screen px-3 py-1 gap-y-4">
            <ProfileCard />
            <AnalyticsCard />
            <EducationAdsCard />
            <EventsCard />
            <SideFooter  />
        </div>
    )
}

export default LeftPanel