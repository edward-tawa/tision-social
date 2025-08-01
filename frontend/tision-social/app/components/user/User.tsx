import React from 'react'
import { UserInterface } from "@/app/data/user/userSlice"

const User: React.FC<UserInterface> = ({ id, firstname, lastname, username, email, password }) => {
    return (
        <div className="fixed left-1/2 -translate-x-1/2 bg-white p-2 rounded-lg flex flex-col gap-2 w-full max-w-md mx-auto h-[75vh] z-30 shadow-md border border-gray-200">
            <div className="flex justify-center items-center">
                <h1>User Details</h1>
            </div>
            <div className="flex flex-row gap-2">
                <span>{firstname}</span>
                <span>{lastname}</span>
            </div>

            <div className="flex flex-row gap-2">
                <span>Username</span>
                <span>{username}</span>
            </div>

            <div className="flex flex-row gap-2">
                <span>Email</span>
                <span>{email}</span>
            </div>

            <div className="flex flex-row gap-2">
                <span>Password</span>
                <span>{password}</span>
            </div>
        </div>
    )
}

export default User