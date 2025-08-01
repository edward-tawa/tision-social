"use client";
import React from 'react';
import EventList from "@/app/components/event/EventList";
import { dummyEvents } from "@/app/data/event/eventSlice";
import { useSelector } from "react-redux";
import { RootState } from "@/app/data/store/store";





const page = () => {
    const { event, events } = useSelector((state: RootState) => state.eventSlice)

    return (
        <div className="hover:cursor-pointer">
            <EventList events={events} />
        </div>
    )
}

export default page