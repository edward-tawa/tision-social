import React, { useState } from 'react'
import { UserInterface } from '@/app/data/user/userSlice';
import UpdateUser from "@/app/components/admin/user/UpdateUser"
import { Edit, Trash2 } from "lucide-react";
import { useDispatch } from 'react-redux';
import { deleteUser } from '@/app/data/user/userSlice';

interface UserListInterface {
    users: UserInterface[]
}



const UserListTable: React.FC<UserListInterface> = ({ users }) => {
    const dispatch = useDispatch()
    const [user, setUser] = useState<UserInterface | null>(null)
    const handleEdit = (user: UserInterface) => {
        setUser(user)
    }
    const closeEdit = () => {
        setUser(null)
    }
    const handleDelete = (userId: number) => {
        dispatch(deleteUser(userId))
    }
    return (
        <div className="bg-white rounded-lg flex flex-col gap-2 p-2 w-full">
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Firstname</th>
                        <th>Lastname</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Password</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map((user, index) => (
                            <tr key={user.id} className='hover:bg-gray-50 border-b border-gray-200'>
                                <td className="px-4 py-2 border">{user.id}</td>
                                <td className="px-4 py-2 border">{user.firstname}</td>
                                <td className="px-4 py-2 border">{user.lastname}</td>
                                <td className="px-4 py-2 border">{user.username}</td>
                                <td className="px-4 py-2 border">{user.email}</td>
                                <td className="px-4 py-2 border">••••••••</td> {/* Hidden password */}
                                <td className="flex flex-row gap-2 px-4 py-2 border">
                                    <Edit className="w-4 h-5 cursor-pointer" onClick={() => { handleEdit(user) }} />
                                    <Trash2 className="w-4 h-5 cursor-pointer" onClick={() => { handleDelete(user.id) }} />
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>

            {
                user && (
                    <UpdateUser {...user} close={closeEdit} />
                )
            }
        </div>
    )
}

export default UserListTable