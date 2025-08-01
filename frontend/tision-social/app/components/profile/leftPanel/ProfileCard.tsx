import React from 'react'
import { Image, Video, UserCircle } from 'lucide-react';

const ProfileCard = () => {
    return (
        <div className="flex flex-col w-full text-text-color rounded-lg gap-2 px-2 bg-white">
            <div className="flex flex-row items-center w-full">
                <UserCircle className="w-14 h-14 text-secondary" />
            </div>
            <div className="w-full flex flex-col gap-1">
                <p>User Name</p>
                <p>Profession</p>
                <p>Location</p>
                <p>Company</p>
            </div>

        </div>
    )
}

export default ProfileCard