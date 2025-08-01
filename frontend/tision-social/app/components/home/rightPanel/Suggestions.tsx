import React from 'react';
import ProfileSuggestionList from "@/app/components/suggestion/ProfileSuggestionList";

const Suggestions = () => {
    return (
        <div className="flex flex-col w-full text-text-color rounded-lg border border-gray-200 gap-1 px-2 bg-white">
            <div className="text-lg">Suggestions for you</div>
            <ProfileSuggestionList />
        </div>
    )
}

export default Suggestions