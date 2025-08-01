//profile page.tsx
import React from 'react'
import LeftPanel from '@/app/components/profile/leftPanel/LeftPanel';
import RightPanel from '@/app/components/profile/rightPanel/RightPanel';
import Footer from '@/app/components/footer/Footer';
import { getUserId } from "@/app/utils/getUserId";
import { getBio } from '@/app/data/profile/bio/api';
import SetProfileToStateProps from "@/app/profile/SetProfileToState";
import { getExperience } from '@/app/data/profile/experience/api';

const page = async () => {
  const userId = await getUserId()
  const bio = await getBio(userId ?? 0)
  const experience = await getExperience(userId ?? 0)

  return (
    <div className="flex flex-col sm:grid sm:grid-cols-12 text-text-color bg-primary">
      <div className="sm:col-span-4 md:col-span-4 lg:col-span-4">
        <LeftPanel />
      </div>
      <div className="sm:col-span-8 md:col-span-8 lg-col-span-8">
        <RightPanel />
      </div>

      <div className="sm:col-span-12 md:col-span-12 lg-col-span-12">
        <Footer />
      </div>

      {/* component to state of profile data eg bio, experience, projects etc */}
      <SetProfileToStateProps bio={bio} experience={experience} />
    </div>
  )
}



export default page