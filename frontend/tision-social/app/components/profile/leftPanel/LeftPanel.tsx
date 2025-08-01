import React from 'react';
import ProfileCard from './ProfileCard';
import Button from '../../buttons/Button';
import ContactInfoCard from './ContactInfoCard';
import Metrics from './Metrics';
import { BadgeCheck } from "lucide-react";


const LeftPanel = () => {
  return (
    <div className="bg-primary sm:flex sm:flex-col rounded px-1 py-1">
      <div className="flex flex-col bg-white rounded gap-y-6 px-4 py-2">
        <ProfileCard />
        <div className="flex flex-row gap-2">
          <BadgeCheck className="w-5 h-5 text-secondary" />
          <p>Python Developer</p>
        </div>
        <ContactInfoCard />
        <Metrics />
      </div>
    </div>
  )
}

export default LeftPanel