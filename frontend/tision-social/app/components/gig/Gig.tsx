import React from 'react';
import Button from "../buttons/Button";

const Gig = () => {
    return (
        <div className="flex flex-col w-full rounded-lg bg-white text-text-color overflow-x-hidden">
            <div className="rounded-lg px-2 py-1">
                <div className="flex flex-col gap-3">
                    <p className="text-text-color">Gig Name</p>
                    <p className="text-text-color">Company Name</p>
                    <p className="text-text-color">Gig Location</p>
                    <p className="text-text-color">Gig Type</p>
                    <p className="text-text-color">Gig Description</p>
                </div>
            </div>
            <div className="flex flex-row items-center mt-2 gap-4 py-2 px-2">
                <div>
                    <Button text="Apply" size="small" color="secondary" className="rounded-full hover:cursor-pointer" />
                </div>
                <div>
                    <Button text="Save Gig" size="small" color="secondary" className="rounded-full hover:cursor-pointer" />
                </div>

            </div>
        </div>
    )
}

export default Gig