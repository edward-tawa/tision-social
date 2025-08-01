import React from 'react';
import { Users, Bookmark, Newspaper, CalendarDays } from "lucide-react";
import Link from 'next/link';

const EventsCard = () => {
    return (
        <div className="flex flex-col w-full text-text-color rounded-lg border border-gray-200 gap-2 px-3 py-2 bg-white">
            <Link href="#">
                <p className="flex items-center gap-2">
                    <span><Bookmark className="h-4 w-4 text-secondary" /></span>
                    Saved
                </p>
            </Link>
            <Link href="#">
                <p className="flex items-center gap-2">
                    <span><Users className="h-4 w-4 text-secondary" /></span>
                    Groups
                </p>
            </Link>
            <Link href="#">
                <p className="flex items-center gap-2">
                    <span><Newspaper className="h-4 w-4 text-secondary" /></span>
                    News letters
                </p>
            </Link>
            <Link href="#">
                <p className="flex items-center gap-2">
                    <span><CalendarDays className="h-4 w-4 text-secondary" /></span>
                    Events
                </p>
            </Link>
        </div>
    )
}

export default EventsCard