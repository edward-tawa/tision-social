"use client";
import React, { ChangeEvent } from 'react'
import { addEvent, setEvent } from "@/app/data/event/eventSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { RootState } from "@/app/data/store/store";
interface CreateEventProps {
    close: () => void;
}

const CreateEvent: React.FC<CreateEventProps> = ({ close }) => {
    const { event } = useSelector((state: RootState) => state.eventSlice)
    const [eventData, setEventData] = useState({
        id: crypto.randomUUID(),
        name: "",
        description: "",
        location: "",
        date: "",
        startTime: "",
        endTime: ""
    });

    const dispatch = useDispatch()
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEventData({
            ...eventData,
            [e.target.name]: e.target.value
        })
        const eventdata = { ...eventData }
        dispatch(setEvent(eventdata))
    }
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (event) {
            dispatch(addEvent(event));
            alert(event)
        }
        close();
    }

    return (
        <div className="fixed top-3/5 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-2 shadow-lg z-40 w-[90%] sm:w-full max-w-md mx-auto border border-gray-200 backdrop-blur-md max-h-[75vh] overflow-y-auto custom-scrollbar">
            <form className="p-1 flex flex-col gap-2" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-1">
                    <label>Event Name</label>
                    <input type="text"
                        className="p-1 w-full rounded-md border border-gray-200"
                        onChange={handleChange}
                        name="name"
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label>Description</label>
                    <input type="text"
                        className="p-1 w-full rounded-md border border-gray-200"
                        onChange={handleChange}
                        name="description"
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label>Location</label>
                    <input type="text"
                        className="p-1 w-full rounded-md border border-gray-200"
                        onChange={handleChange}
                        name="name"
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label>Date</label>
                    <input type="date"
                        className="p-1 w-full rounded-md border border-gray-200"
                        onChange={handleChange}
                        name="date"
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label>Start Time</label>
                    <input type="time"
                        className="p-1 w-full rounded-md border border-gray-200"
                        onChange={handleChange}
                        name="startTime"
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label>End Time</label>
                    <input type="time"
                        className="p-1 w-full rounded-md border border-gray-200"
                        onChange={handleChange}
                        name="endTime"
                    />
                </div>


                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors 
                    cursor-pointer hover:bg-primary hover:text-text-color"
                    onClick={handleSubmit}
                >
                    Create Event
                </button>


            </form>
        </div>
    )
}

export default CreateEvent