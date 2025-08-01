"use client";
import React from 'react'
import { useSelector } from 'react-redux';
import { randomSuggestion } from "@/app/components/suggestion/utils/randomSuggestion"
import { usersWithSameInstitution } from "@/app/data/profile/profileSelectors";

import ProfileSuggestion from '@/app/components/suggestion/ProfileSuggestion';
const ProfileSuggestionList = () => {

    const currentUserId = 1;
    //const usersSameInstitutionMap = useSelector(usersWithSameInstitutionMap)
    const sameInstitution = useSelector(usersWithSameInstitution(1))
    const suggestions = randomSuggestion(sameInstitution || [], 3);
    return (
        <div className="flex flex-col">
            <div className="flex flex-col gap-2">
                {[...(suggestions || [])].map((user) => (
                    <ProfileSuggestion key={user.id} suggestedUser={user} />
                ))}
            </div>
            {sameInstitution.length === 0 && (
                <div className="text-center text-gray-500">No suggestions available</div>
            )}
        </div>
    )
}

export default ProfileSuggestionList