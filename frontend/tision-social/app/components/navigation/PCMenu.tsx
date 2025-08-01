"use client"
import React from 'react';
import { MessageSquare, Bell, Briefcase, Hammer, Users } from "lucide-react";
import { useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from '@/app/data/store/store';
import { toggleMenu } from "@/app/data/store/menuVisibleSlice";
import UserAvatar from '../avatars/UserAvatar';
import AccountMenu from './AccountMenu';
import SearchBar from '@/app/components/search/SearchBar';
import Link from "next/link";
// 


const PCMenu = () => {
    const dispatch = useDispatch()
    const { isVisible, position } = useSelector((state: RootState) => state.menuVisible);
    const iconRef = useRef<HTMLDivElement | null>(null);

    const handleToggleMenu = () => {
        if (!iconRef.current) return;
        const rect = iconRef.current.getBoundingClientRect();
        const newPosition = {
            top: rect.bottom + 27,
            left: rect.left - 57
        }

        dispatch(toggleMenu(newPosition))

    }
    return (
        <div className="hidden md:flex flex-row items-center w-full justify-between px-5">
            <Link href="/">
                <div className="flex flex-row gap-4 items-center">
                    <div className="text-[35px] font-serif text-white">Tision</div>
                </div>
            </Link>

            <div className="flex flex-row gap-4 items-center">
                <div className="relative group form-control relative">
                    <SearchBar />
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 px-2 py-1 rounded text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        Search
                    </div>
                </div>
                <Link href="">
                    <div className="relative group cursor-pointer">
                        <MessageSquare className="w-6 h-6 text-primary" />
                        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 px-2 py-1 rounded text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            Messages
                        </div>
                    </div>
                </Link>
                <Link href="/notification">
                    <div className="relative group cursor-pointer">
                        <Bell className="w-6 h-6 text-primary" />
                        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 px-2 py-1 rounded text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            Notifications
                        </div>
                    </div>
                </Link>
                <Link href="/job">
                    <div className="relative group cursor-pointer">
                        <Briefcase className="w-6 h-6 text-primary" />
                        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 px-2 py-1 rounded text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            Jobs
                        </div>
                    </div>
                </Link>
                <Link href="/gig">
                    <div className="relative group cursor-pointer">
                        <Hammer className="w-6 h-6 text-primary" />
                        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 px-2 py-1 rounded text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            Gigs
                        </div>
                    </div>
                </Link>
                <Link href="/connections">
                    <div className="relative group cursor-pointer">
                        <Users className="w-6 h-6 text-primary" />
                        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 px-2 py-1 rounded text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            Connections
                        </div>
                    </div>
                </Link>
                <div ref={iconRef} onClick={handleToggleMenu} className="cursor-pointer"><UserAvatar /></div>

            </div>

            <AccountMenu show={isVisible} style={{ position: 'absolute', ...position }} />

        </div>
    )
}

export default PCMenu