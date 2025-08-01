import React, { useState } from 'react'
import { GigInterface } from "@/app/data/gig/gigSlice";
import { Pencil, Trash2 } from "lucide-react";
import UpdateGig from "@/app/components/admin/gig/UpdateGig";


interface GigsProps {
    gigs: GigInterface[];
}
// This component is a placeholder for mobile card view.
const MobileCardView: React.FC<GigsProps> = ({ gigs }) => {
    const [gigUpdate, setGigUpdate] = useState<GigInterface>();

    //for handling gig update
    const handleGigUpdate = (gig: GigInterface) => {
        setGigUpdate(gig);

    }
    return (
        <div className="bg-primary rounded-lg">
            {gigs?.map((gig, index) => (
                <div
                    key={index}
                    className="bg-white rounded-lg p-4 shadow mb-6 flex flex-col gap-2"
                >
                    <p>Title: {gig.title || "Tawa"} </p>
                    <p>Location: {gig.location || "Tawa"} </p>
                    <p>Category: {gig.category || "Tawa"} </p>
                    <p>Date Posted: {gig.datePosted || "Tawa"} </p>
                    <p>Expiry Date: {gig.expiryDate || "Tawa"} </p>

                    <p>
                        <Pencil className="w-4 h-4 text-blue-500 hover:text-blue-700 cursor-pointer"
                            onClick={() => handleGigUpdate(gig)} />
                    </p>
                    <p>
                        <Trash2 className="w-4 h-4 text-red-500 hover:text-red-700 cursor-pointer" />
                    </p>
                </div>
            ))}

            {
                gigUpdate && (
                    <UpdateGig {...gigUpdate} close={() => setGigUpdate(undefined)} />
                )
            }
        </div>
    )
}

export default MobileCardView