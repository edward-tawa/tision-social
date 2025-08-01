"use client";
import React from 'react';
import ActivityList from "@/app/components/activity/ActivityList"
import { RootState } from "@/app/data/store/store";
import { useSelector } from 'react-redux';


const Activity = () => {
  const { posts } = useSelector((state: RootState) => state.postsSlice)
  return (
    <div className="flex flex-col gap-5 rounded-lg px-2 py-2">
      <h1 className="font-bold text-md text-black">Activity</h1>
      <ActivityList posts={posts} />
    </div>
  )
}

export default Activity