import React from 'react';
import Button from "@/app/components/buttons/Button";
import UserAvatar from "@/app/components/avatars/UserAvatar";
import CreateConnection from "@/app/components/connections/CreateConnection";
import { currentUserSelector } from "@/app/data/user/selectors";
import { useSelector } from "react-redux"

interface ProfileSuggestionProps {
    suggestedUser: any  // this user type is computed in profile selectors. a user with a profile
}

const ProfileSuggestion: React.FC<ProfileSuggestionProps> = ({ suggestedUser }) => {
    const currentUser = useSelector(currentUserSelector)

    return (
        <div className="flex flex-col w-full h-32 rounded-lg gap-2 px-1 bg-white py-1">
            <div className="flex flex-row w-full items-center gap-3">
                <UserAvatar />
                <div className="flex-grow text-sm text-text-color">
                    <p className="font-semibold">{suggestedUser.username}</p>
                    <p>{suggestedUser?.profile?.experience?.[0]?.company ?? "No company info"}</p>
                    <p className="text-xs text-gray-500 line-clamp-2">
                        Attended {suggestedUser?.profile?.education?.[0]?.institution ?? "No education info"}
                    </p>
                </div>
            </div>
            <div className="flex flex-col gap-1 w-full ">

                <div className="flex flex-row justify-end">
                    <CreateConnection sender={currentUser} receiver={suggestedUser} />
                </div>
            </div>

        </div>
    )
}

export default ProfileSuggestion