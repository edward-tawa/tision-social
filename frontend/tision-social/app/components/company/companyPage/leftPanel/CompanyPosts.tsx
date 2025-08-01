"use client";
import React from 'react'
import Post from "../../../posts/Post";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const companyPosts: React.ReactNode[] = [<Post />, <Post />, <Post />, <Post />]
const CompanyPosts: React.FC = () => {
    const [current, setCurrent] = useState<number>(0);
    const next = () => {
        setCurrent((prev) => (prev + 1) % companyPosts.length);

    }

    const prev = () => {
        setCurrent((prev) => (prev - 1 + companyPosts.length) % companyPosts.length);
    }
    const currentPost = companyPosts[current]
    return (
        <div className="relative bg-white rounded-lg py-2 px-2">
            <h2 className="text-lg font-semibold mb-2">Company Posts</h2>
            {currentPost}

            <button
                onClick={prev}
                className="absolute top-1/2 left-2 -translate-y-1/2 p-2 shadow-md hover:cursor-pointer"
            >
                <ChevronLeft className="h-5 w-5 text-blue-500 font-bold" />
            </button>

            <button
                onClick={next}
                className="absolute top-1/2 right-2 -translate-y-1/2 p-2 shadow-md hover:cursor-pointer"
            >
                <ChevronRight className="h-5 w-5 text-blue-500 font-bold" />
            </button>
        </div>
    )
}

export default CompanyPosts