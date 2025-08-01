"use client";
import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { RootState } from '@/app/data/store/store';
import ActivityList from '@/app/components/activity/ActivityList';


const page = () => {
    const { posts } = useSelector((state: RootState) => state.postsSlice);
    return (
        <div className="bg-primary flex flex-col gap-1 p-1">
            <h1 className="font-bold text-2xl">Activity</h1>
            <ActivityList posts={posts} />
        </div>
    )
}

export default page