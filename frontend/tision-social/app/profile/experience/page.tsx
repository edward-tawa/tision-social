import React from 'react'
import ExperienceList from "../../components/profile/rightPanel/experience/ExperienceList";
import LeftPanel from '../../components/profile/leftPanel/LeftPanel';


const page = () => {
  return (
    <div className="flex flex-col sm:grid sm:grid-cols-12 text-text-colur bg-primary">

        <div className="hidden sm:inline-block sm:col-span-4 md:col-span-4 lg:col-span-4">
            <LeftPanel />
        </div>
       
        <div className="flex flex-col gap-y-4 px-2 sm:col-span-8 md:col-span-8 lg-col-span-8 mt-1">
          
             <ExperienceList title="" company="" location="" duration="" description="" />
            
        </div>
    </div>
  )
}

export default page