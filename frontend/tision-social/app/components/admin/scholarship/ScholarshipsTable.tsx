import React, { useState } from 'react'
import Button from "@/app/components/buttons/Button";
import { Pencil, Trash2 } from "lucide-react";
import { deleteScholarship } from "@/app/data/scholarship/scholarshipSlice";
import { useDispatch } from 'react-redux';
import { ScholarshipInterface } from "@/app/data/scholarship/scholarshipSlice";
import UpdateScholarship from "@/app/components/admin/scholarship/UpdateScholarship";

interface ScholarshipInterfaceTableProps {
    scholarships: ScholarshipInterface[]
}

const ScholarshipsTable: React.FC<ScholarshipInterfaceTableProps> = ({ scholarships }) => {
    const dispatch = useDispatch();
    const [scholarshipUpdate, setScholarshipUpdate] = useState<ScholarshipInterface | null>(null);

    const handleScholarshipDelete = (scholarshipId: number) => {
        dispatch(deleteScholarship(scholarshipId));
    }

    const handleScholarshipUpdate = (scholarship: ScholarshipInterface | null) => {
        setScholarshipUpdate(scholarship);
    }

    return (
        <div className="bg-white rounded-lg px-4 py-4 text-text-color max-w-screen overflow-x-hidden">
            <div className="mb-5"><h2 className="font-bold">Scholarships</h2></div>

            <div className="flex flex-col md:flex-row items-start md:items-center w-full gap-4 mb-5">
                <Button text="Create Scholarship" size="small" color="secondary" className="rounded-full" />
                <input
                    type="text"
                    name="search"
                    placeholder="Search"
                    className="rounded-md focus:outline-none text-text-color bg-primary py-1 px-2"
                />
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-[1000px] table-auto w-full">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="px-4 py-2 text-left whitespace-nowrap">ID</th>
                            <th className="px-4 py-2 text-left whitespace-nowrap">Poster ID</th>
                            <th className="px-4 py-2 text-left whitespace-nowrap">Name</th>
                            <th className="px-4 py-2 text-left whitespace-nowrap">Description</th>
                            <th className="px-4 py-2 text-left whitespace-nowrap">Requirements</th>
                            <th className="px-4 py-2 text-left whitespace-nowrap">Deadline</th>
                            <th className="px-4 py-2 text-left whitespace-nowrap">Amount</th>
                            <th className="px-4 py-2 text-left whitespace-nowrap">Active</th>
                            <th className="px-4 py-2 text-left whitespace-nowrap">Created At</th>
                            <th className="px-4 py-2 text-left whitespace-nowrap">Updated At</th>
                            <th className="px-4 py-2 text-left whitespace-nowrap">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {scholarships.map((scholarship) => (
                            <tr key={scholarship.id} className="border-b">
                                <td className="px-4 py-2 whitespace-nowrap">{scholarship.id}</td>
                                <td className="px-4 py-2 whitespace-nowrap">{scholarship.posterId}</td>
                                <td className="px-4 py-2 whitespace-nowrap">{scholarship.name}</td>
                                <td className="px-4 py-2">{scholarship.description}</td>
                                <td className="px-4 py-2">{scholarship.requirements}</td>
                                <td className="px-4 py-2 whitespace-nowrap">{scholarship.deadline}</td>
                                <td className="px-4 py-2 whitespace-nowrap">{scholarship.amount}</td>
                                <td className="px-4 py-2 whitespace-nowrap">{scholarship.isActive ? 'Yes' : 'No'}</td>
                                <td className="px-4 py-2 whitespace-nowrap">{scholarship.createdAt}</td>
                                <td className="px-4 py-2 whitespace-nowrap">{scholarship.updatedAt}</td>
                                <td className="px-4 py-2 whitespace-nowrap">
                                    <div className="flex gap-2">
                                        <Pencil
                                            className="w-4 h-4 text-blue-500 hover:text-blue-700 cursor-pointer"
                                            onClick={() => handleScholarshipUpdate(scholarship)}
                                        />
                                        <Trash2
                                            className="w-4 h-4 text-red-500 hover:text-red-700 cursor-pointer"
                                            onClick={() => handleScholarshipDelete(scholarship.id)}
                                        />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {scholarshipUpdate && (
                <UpdateScholarship {...scholarshipUpdate} close={() => handleScholarshipUpdate(null)} />
            )}
        </div>
    )
}

export default ScholarshipsTable;