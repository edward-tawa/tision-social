import React from 'react'
import Button from "../buttons/Button";


interface JobProps {
    id?: number;
    title?: string;
    location?: string;
    category?: string;
    duration?: string;
    datePosted?: string;
    dateExpired?: string;
    //Optinal has to be changed just using for testing

}

const Job: React.FC<JobProps> = ({ title, location, category, duration, datePosted, dateExpired }) => {
    return (
        <div className="flex flex-col w-full rounded-lg bg-white text-text-color overflow-x-hidden">
            <div className="rounded-lg px-4 py-1">
                <div className="flex flex-col gap-1">
                    <p className="text-text-color">{title || "Tawa"}</p>
                    <p className="text-text-color">{location || "Tawa"}</p>
                    <p className="text-text-color">{category || "Tawa"}</p>
                    <p className="text-text-color">{duration || "Tawa"}</p>
                    <p className="text-text-color">{datePosted || "Tawa"}</p>
                    <p className="text-text-color">{dateExpired || "Tawa"}</p>
                </div>
            </div>
            <div className="flex flex-row items-center mt-2 gap-4 py-2 px-2">
                <div>
                    <Button text="Apply" size="small" color="secondary" className="rounded-full hover:cursor-pointer" />
                </div>
                <div>
                    <Button text="Save Job" size="small" color="secondary" className="rounded-full hover:cursor-pointer" />
                </div>

            </div>
        </div>
    )
}

export default Job