import React from 'react'
import { UserInterface } from '@/app/data/user/userSlice';
import User from "@/app/components/user/User"

interface UserListInterface {
    users: UserInterface[]
}
const UserList: React.FC<UserListInterface> = ({ users }) => {
    return (
        <div className="bg-white rounded-lg flex flex-col gap-2 p-2 w-full">
            {
                users.map((user) => (
                    <div key={user.id}>
                        <User  {...user} />
                    </div>
                ))
            }
        </div>
    )
}

export default UserList