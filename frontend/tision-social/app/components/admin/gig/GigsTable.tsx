"use client";
import React from 'react'
import { useState, useRef, useEffect } from 'react';
import Button from "@/app/components/buttons/Button";
import { Pencil, Trash2 } from "lucide-react";
import { GigInterface } from "@/app/data/gig/gigSlice";
import UpdateGig from "@/app/components/admin/gig/UpdateGig";
import CreateGig from "@/app/components/admin/gig/CreateGig";
import { useDispatch, useSelector } from 'react-redux';
import { deleteGig } from "@/app/data/gig/gigSlice";
import { selectAllGigs } from "@/app/data/store/slices/gig/gigSelectors"



interface Gigs {
    gigs: GigInterface[];
}

const GigsTable = ({ gigs }: Gigs) => {


    const dispatch = useDispatch();
    const gigsFromStore = useSelector(selectAllGigs);
    const [allGigs, setAllGigs] = useState<GigInterface[]>(gigs);
    const [currentGigs, setCurrentGigs] = useState<GigInterface[]>(gigs);
    const [gigUpdate, setGigUpdate] = useState<GigInterface>();
    const [createGig, setCreateGig] = useState<boolean>(false);
    const searchRef = useRef<HTMLInputElement>(null);

    // Whenever gigsFromStore updates, sync local state:
    useEffect(() => {
        setAllGigs(gigsFromStore);
        setCurrentGigs(gigsFromStore);
    }, [gigsFromStore]);

    const handleGigDelete = (gigId: number) => {
        dispatch(deleteGig(gigId))
    }

    const searchFilter = () => {
        const searchTerm = searchRef.current?.value.toLowerCase() || "";
        if (searchTerm) {
            const filteredGigs = allGigs.filter(gig => gig.title.toLowerCase().includes(searchTerm) || gig.location.toLowerCase().includes(searchTerm) || gig.category.toLowerCase().includes(searchTerm));
            setCurrentGigs(filteredGigs);
        }
        else {
            setCurrentGigs(allGigs);
        }
    }
    //for handling create gig
    const handleCreateGig = () => {
        setCreateGig(true); //needed for create gig modal which then dispatches addGig action
        setGigUpdate(undefined); // Reset gig update state when creating a new gig
    }
    //for handling gig update
    const handleGigUpdate = (gig: GigInterface) => {
        setGigUpdate(gig);

    }
    return (
        <div className="bg-white rounded-lg px-2 py-2 text-text-color mx-w-screen overflow-x-hidden">
            <div className="mb-5"><h2 className="font-bold">Gigs</h2></div>
            <div className="flex flex-row items-center w-full gap-5 mb-5">
                <div><Button text="Create Gig" size="small" color="secondary" className="rounded-full" onClick={handleCreateGig} /></div>
                <div><input type="text" name="search" placeholder="search" className="px-2 rounded-md focus:outline-none text-text-color bg-primary py-1" ref={searchRef} onChange={searchFilter} /></div>

            </div>
            <table className="w-full table-auto">
                <thead>
                    <tr className="border-b">
                        <th className="px-4 py-2 text-left">Title</th>
                        <th className="px-4 py-2 text-left">Location</th>
                        <th className="px-4 py-2 text-left">Category</th>
                        <th className="px-4 py-2 text-left">Duration</th>
                        <th className="px-4 py-2 text-left">Date Posted</th>
                        <th className="px-4 py-2 text-left">Expiry Date</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        currentGigs.map((gig, index) => (
                            <tr key={gig.id} className="border-b">
                                <td className="px-4 py-2">{gig.title}</td>
                                <td className="px-4 py-2">{gig.location}</td>
                                <td className="px-4 py-2">{gig.category}</td>
                                <td className="px-4 py-2">{gig.duration}</td>
                                <td className="px-4 py-2">{gig.datePosted}</td>
                                <td className="px-4 py-2">{gig.expiryDate}</td>
                                <td className="px-4 py-2 flex gap-2">
                                    <Pencil className="w-4 h-4 text-blue-500 hover:text-blue-700 cursor-pointer"
                                        onClick={() => handleGigUpdate(gig)} />
                                    <Trash2 className="w-4 h-4 text-red-500 hover:text-red-700 cursor-pointer"
                                        onClick={() => handleGigDelete(gig.id)} />
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>

            {
                gigUpdate && (
                    <UpdateGig {...gigUpdate} close={() => setGigUpdate(undefined)} />
                )
            }

            {
                createGig && (
                    <CreateGig close={() => setCreateGig(false)} />
                )
            }
        </div>
    )
}

export default GigsTable