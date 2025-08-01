import React from 'react';
import { MoreHorizontal } from 'lucide-react';
import EventMenu from "@/app/components/event/EventMenu";
import UpdateEvent from "@/app/components/event/UpdateEvent";
import { EventInterface } from "@/app/data/event/eventSlice"
import { useState } from "react";



const Event = ({ id, name, description, location, date, startTime, endTime }: EventInterface) => {

    const [eventMenu, setEventMenu] = useState<boolean>(false);
    const [updateEvent, setUpdateEvent] = useState<boolean>(false);

    const handleUpdateEvent = () => {
        setUpdateEvent(!updateEvent);
    }
    const handleEventMenu = () => {
        setEventMenu(!eventMenu);
    }
    const event = { id, name, description, location, date, startTime, endTime, close: updateEvent }
    return (
        <>
            <div className="w-[250px] h-[250px] flex flex-col items-center bg-white text-text-color rounded-lg px-2 py-2 
        hover:scale-105 hover:shadow-lg hover:z-40 transition-transform duration-300 ">
                <div className="flex flex-col gap-2 h-full">
                    <div className="flex justify-end">
                        <div className="relative">
                            <MoreHorizontal className="w-5 h-5 text-secondary border border-blue-300 rounded-full" onClick={handleEventMenu} />
                            {eventMenu && (
                                <div className="absolute top-full right-1/2 ">
                                    <EventMenu close={handleUpdateEvent} isOpen={handleEventMenu} />
                                </div>
                            )}
                        </div>
                    </div>
                    <p>{name}</p>
                    <p>{description}</p>
                    <p>Venue {location}</p>
                    <p>Date {date}</p>
                    <div className="flex flex-col gap-1 items-center">
                        <p>Start Time {startTime}</p>
                        <p>End Time {endTime}</p>
                    </div>
                </div>

            </div>
            {updateEvent && (

                <UpdateEvent id={id} name={name} description={description} location={location} date={date}
                    startTime={startTime} endTime={endTime} close={handleUpdateEvent} />
            )}
        </>
    )
}

export default Event