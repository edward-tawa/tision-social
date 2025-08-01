import React from 'react';
import { Image, Video, UserCircle } from 'lucide-react';
import Button from '../../../buttons/Button';

const CompanySuggestion = () => {
    return (
        <div className="flex flex-col w-full h-32 rounded-lg gap-2 px-1 bg-white py-1">
            <div className="flex flex-row w-full items-center gap-3">
                <UserCircle className="w-10 h-10 text-secondary flex-shrink-0" />
                <div className="flex-grow text-sm text-text-color">
                    <p className="font-semibold">Company Name</p>
                    <p>Industry</p>
                    <p className="text-xs text-gray-500 line-clamp-2">Company profile gsgds khsdsjd skdsdsdbv dfdfdfdgfgsdsd dfdfdfdfdd
                        fdfdfdfdfdf fdgfgffgh jghjhjh hgjhjh
                    </p>

                </div>
            </div>
            <div className="flex flex-col gap-1 w-full ">

                <div className="flex flex-row justify-end"><Button text="Follow +" size="small" color="secondary" className="rounded-full" /></div>
            </div>

        </div>
    )
}

export default CompanySuggestion