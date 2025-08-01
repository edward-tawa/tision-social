import React, { useState } from 'react'
import { InstitutionInterface } from "@/app/data/store/slices/institution/institutionSlice";
import Button from "@/app/components/buttons/Button";
import UpdateInstitution from "@/app/components/admin/institution/UpdateInstitution";
import { deleteInstitution } from "@/app/data/store/slices/institution/institutionSlice";
import { Pencil, Trash2 } from "lucide-react";
import { useDispatch } from 'react-redux';

interface institutionsTableProps {
    institutions: InstitutionInterface[]
}
const InstitutionsTable: React.FC<institutionsTableProps> = ({ institutions }) => {

    const dispatch = useDispatch();
    const [institutionUpdate, setInstitutionUpdate] = useState<InstitutionInterface | null>(null);

    //dispatched an action to redux store to delete a job using its id
    const handleInstitutionDelete = (institutionId: number) => {
        dispatch(deleteInstitution(institutionId))
    }

    //function to handle job update
    const handleInstitutionUpdate = (institution: InstitutionInterface | null) => {
        setInstitutionUpdate(institution);
    }
    return (
        <div className="bg-white rounded-lg px-2 py-2 text-text-color max-w-screen overflow-x-hidden">
            <div className="mb-5"><h2 className="font-bold">Institutions</h2></div>
            <div className="flex flex-row items-center w-full gap-5 mb-5">
                <div><Button text="Create Institution" size="small" color="secondary" className="rounded-full" /></div>
                <div><input type="text" name="search" placeholder="search" className="rounded-md focus:outline-none text-text-color bg-primary py-1" /></div>

            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full table-auto">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 text-left">Institution Id</th>
                            <th className="px-4 py-2 text-left">Name</th>
                            <th className="px-4 py-2 text-left">Location</th>
                            <th className="px-4 py-2 text-left">Offers</th>
                            <th className="px-4 py-2 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {institutions.map((institution) => (
                            <tr key={institution.id} className="border-b">
                                <td className="px-4 py-2">{institution.id}</td>
                                <td className="px-4 py-2">{institution.name}</td>
                                <td className="px-4 py-2">{institution.location}</td>
                                <td className="px-4 py-2">
                                    {institution.offers.length > 0 ? (
                                        institution.offers.map((offer, index) => (
                                            <span key={index} className="inline-block bg-gray-200 rounded-full px-2 py-1 text-sm mr-2 mb-2">
                                                {offer}
                                            </span>
                                        ))
                                    ) : (
                                        <span className="text-gray-500">No offers available</span>
                                    )}
                                </td>
                                <td className="px-4 py-2 flex gap-2">
                                    <Pencil
                                        className="w-4 h-4 text-blue-500 hover:text-blue-700 cursor-pointer"
                                        onClick={() => handleInstitutionUpdate(institution)}
                                    />
                                    <Trash2
                                        className="w-4 h-4 text-red-500 hover:text-red-700 cursor-pointer"
                                        onClick={() => handleInstitutionDelete(institution.id)}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>


            {
                institutionUpdate && (
                    <UpdateInstitution  {...institutionUpdate} close={() => handleInstitutionUpdate(null)} />
                )
            }
        </div>
    )
}

export default InstitutionsTable