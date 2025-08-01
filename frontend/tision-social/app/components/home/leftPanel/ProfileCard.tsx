import React from 'react';
import UserAvatar from "@/app/components/avatars/UserAvatar";
import { MapPin, User, Briefcase } from "lucide-react";

const ProfileCard = () => {
    return (
        <div className="flex flex-col w-full text-text-color rounded-lg border border-gray-200 gap-2 px-2 py-3 bg-white">
            <div className="flex flex-row items-center w-full">
                <UserAvatar />
            </div>
            <div className="w-full flex flex-col gap-1">
                <p className="flex items-center gap-2">
                    <User className="h-3 w-3 text-secondary" />
                    User Name
                </p>
                <p className="flex items-center gap-2">
                    <Briefcase className="h-3 w-3 text-secondary" />
                    Profession
                </p>
                <p className="flex items-center gap-2">
                    <MapPin className="h-3 w-3 text-secondary" />
                    Location
                </p>
            </div>

        </div>
    )
}

export default ProfileCard