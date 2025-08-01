"use client";
import React from 'react'
import Signin from "@/app/components/signin/Signin"
import PrivacyPolicy from "@/app/components/privacy-policy/PrivacyPolicy";

const page = () => {
    return (
        <div className="w-full h-full relative">
            <Signin />
            <div className="hidden sm:block absolute right-10 top-10">
                <PrivacyPolicy />
            </div>
            <div className="hidden sm:block absolute left-10 bottom-10">
                <PrivacyPolicy />
            </div>
        </div>
    )
}

export default page