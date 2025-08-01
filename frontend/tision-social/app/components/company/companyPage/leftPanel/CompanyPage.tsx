"use client";
import React from 'react'
import UserAvatar from "../../../avatars/UserAvatar";
import Button from "../../../buttons/Button";
import { Ellipsis, CircleEllipsis } from 'lucide-react';
import { useState } from "react";
import CompanyOverview from "./CompanyOverview";
import CompanyPosts from "./CompanyPosts";
import CompanyMetrics from "./CompanyMetrics";

// This is a component for displaying company information on a company page.
const CompanyPage = () => {
    const [active, setActive] = useState<string>("")
    return (
        <>
            <div className="flex flex-col w-full rounded-lg bg-white text-text-color gap-3">
                <div
                    className="relative h-40 bg-cover bg-center rounded-lg"
                    style={{ backgroundImage: "url('/kids.jpg')" }}
                >
                    <div className="absolute left-5 bottom-0" >
                        <UserAvatar />
                    </div>
                </div>
                <div className="flex flex-col gap-3 mt-2 px-2">
                    <p>Company Name</p>
                    <p>Company Motto</p>
                    <p>Company description location followers</p>
                    <p>Users work there</p>
                    <div className="flex flex-row gap-4 items-center">
                        <Button text="Following" size="medium" color="primary" className="rounded-full hover:cursor-pointer" />
                        <Button text="View Website" size="medium" color="secondary" className="rounded-full hover:cursor-pointer" />
                        <div className="hover:cursor-pointer"> <CircleEllipsis size={24} color="gray" /> </div>
                    </div>
                </div>

                <div className="flex flex-row items-center gap-4 px-2">
                    <p onClick={() => setActive("home")} className={`cursor-pointer ${active === 'home' ? 'underline' : ''}`} >
                        Home
                    </p>

                    <p
                        onClick={() => setActive("About")}
                        className={`cursor-pointer ${active === 'About' ? 'underline' : ''}`}>
                        About
                    </p>

                    <p
                        onClick={() => setActive("Posts")}
                        className={`cursor-pointer ${active === 'Posts' ? 'underline' : ''}`}
                    >
                        Posts
                    </p>

                    <p
                        onClick={() => setActive("Jobs")}
                        className={`cursor-pointer ${active === 'Jobs' ? 'underline' : ''}`}
                    >
                        Jobs
                    </p>

                    <p
                        onClick={() => setActive("People")}
                        className={`cursor-pointer ${active === 'People' ? 'underline' : ''}`}
                    >

                    </p>
                </div>

            </div>

            <div className="bg-white rounded-lg py-2 mt-5">
                <CompanyOverview />
            </div>

            <div className="bg-white rounded-lg py-2 mt-5">
                <CompanyPosts />
            </div>

            <div className="bg-white rounded-lg py-2 mt-5">
                <CompanyMetrics />
            </div>



        </>
    )
}

export default CompanyPage