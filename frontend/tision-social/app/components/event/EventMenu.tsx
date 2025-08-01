import React from 'react';
import Link from "next/link";

interface EventMenuProps {
    close: () => void;
    isOpen: () => void;
}

const EventMenu: React.FC<EventMenuProps> = ({ close, isOpen }) => {
    const handleEventMenu = () => {
        close();
        isOpen();
    }
    return (
        <div>
            <ul className="bg-primary text-text-color rounded-lg p-2 border border-gray-200 flex flex-col gap-1 sm:w-20 cursor-pointer justify-center items-center ">
                <li className="hover:text-secondary" onClick={handleEventMenu}>Update</li>
                <li className="hover:text-secondary"><Link href="#">Delete</Link></li>
            </ul>


        </div>
    )
}

export default EventMenu