"use client";
import React from 'react';
import Event from "@/app/components/event/Event";
import Button from "@/app/components/buttons/Button";
import CreateEvent from "@/app/components/event/CreateEvent"
import { EventInterface } from "@/app/data/event/eventSlice"
import { useState } from "react";



interface eventList {
    events: EventInterface[];
}

const EventList: React.FC<eventList> = ({ events }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const handleCreateEvent = () => {
        setIsOpen(!isOpen);
    }
    return (
        <div className="flex flex-col gap-3 items-center justify-center w-full h-full px-2">
            <h1 className="text-2xl font-bold text-text-color">Events</h1>
            <div className="flex flex-row items-center w-full px-10 py-2 justify-between bg-white rounded-lg">
                <h1 className="text-lg font-semibold text-text-color">Create Event</h1>
                <Button text="Create Event" color="secondary" size="medium" className="rounded-full cursor-pointer" onClick={handleCreateEvent} />
            </div>
            <div className="bg-primary px-5 py-2 rounded-md flex flex-row flex-wrap gap-3 justify-center w-full">
                {events.map((event, index) => (
                    <div key={index}>
                        <Event  {...event} />
                    </div>
                ))}
            </div>
            {isOpen && (
                <CreateEvent close={handleCreateEvent} />
            )}
        </div>

    )
}

export default EventList