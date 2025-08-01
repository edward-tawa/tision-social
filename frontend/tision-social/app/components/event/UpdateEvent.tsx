"use client";
import React from 'react'
import { useState } from 'react';
import { addEvent, updateEvent, setEvent } from "@/app/data/event/eventSlice";
import { RootState } from "@/app/data/store/store";
import { useDispatch, useSelector } from "react-redux";
import { EventInterface } from "@/app/data/event/eventSlice"

interface CreateEventProps {
    close: () => void;
}

type UpdateEventProps = CreateEventProps & EventInterface;

const UpdateEvent: React.FC<UpdateEventProps> = ({ id, name, description, location, date, startTime, endTime, close }) => {
    const dispatch = useDispatch()
    const { event } = useSelector((state: RootState) => state.eventSlice)
    const [eventData, setEventData] = useState<EventInterface>({
        id,
        name,
        description,
        location,
        date,
        startTime,
        endTime,
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEventData({
            ...eventData,
            [e.target.name]: e.target.value,
        });
        dispatch(setEvent(eventData));
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (event) {
            dispatch(updateEvent(event))
        }
        else {
            dispatch(addEvent(eventData));
        }
        close()
    }
    return (
        <div className="fixed top-3/5 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md mx-auto bg-white rounded-lg p-2 backdrop-blur-md shadow-lg z-60">
            <form className="p-1 flex flex-col gap-2" onSubmit={handleSubmit}>
                <h2 className="font-bold text-2xl">Update Event</h2>
                {["name", "description", "location"].map((field, index) => (
                    <div className="flex flex-col gap-1" key={index}>
                        <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                        <input type="text"
                            className="p-1 w-full rounded-md border border-gray-200"
                            onChange={handleChange}
                            name={field}
                            value={eventData[field as keyof typeof eventData]}
                        />
                    </div>
                ))}
                <div className="flex flex-col gap-1">
                    <label>Date</label>
                    <input type="date"
                        className="p-1 w-full rounded-md border border-gray-200"
                        name="date"
                        value={eventData.date}
                        onChange={handleChange} />
                </div>
                <div className="flex flex-col gap-1">
                    <label>Start Time</label>
                    <input type="time"
                        className="p-1 w-full rounded-md border border-gray-200"
                        name="startTime"
                        value={eventData.startTime}
                        onChange={handleChange}
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label>End Time</label>
                    <input type="time"
                        className="p-1 w-full rounded-md border border-gray-200"
                        name="endTime"
                        value={eventData.endTime}
                        onChange={handleChange} />
                </div>


                <div>
                    <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors 
                    cursor-pointer hover:bg-primary hover:text-text-color"
                        onClick={close}
                    >
                        Create Event
                    </button>
                </div>

            </form>
        </div>
    )
}

export default UpdateEvent