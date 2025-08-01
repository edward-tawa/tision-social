import React from 'react'
interface JobProps {
    title: string;
    location: string;
    category: string;
    duration: string;
    datePosted: string;
    dateExpired: string;
}

interface JobsProp {
    jobs?: JobProps[];
}
// This component is a placeholder for mobile card view.
const MobileCardView: React.FC<JobsProp> = ({ jobs }) => {
    return (
        <div className="bg-primary rounded-lg">
            {jobs?.map((job, index) => (
                <div
                    key={index}
                    className="bg-white rounded-lg p-4 shadow mb-6 flex flex-col gap-2"
                >
                    <p>Title: {job.title || "Tawa"} </p>
                    <p>Location: {job.location || "Tawa"} </p>
                    <p>Category: {job.category || "Tawa"} </p>
                    <p>Date Posted: {job.datePosted || "Tawa"} </p>
                    <p>Expiry Date: {job.dateExpired || "Tawa"} </p>
                </div>
            ))}
        </div>
    )
}

export default MobileCardView