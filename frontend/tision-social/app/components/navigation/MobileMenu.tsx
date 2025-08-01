"use client"
import React from 'react';
import { Menu } from "lucide-react";
import MobileSideMenu from './MobileSideMenu';
import Button from '../buttons/Button';
import { useState } from "react";
import { User } from 'lucide-react';
import { MessageSquare, Bell } from "lucide-react";
import { UserCircle } from 'lucide-react';



const MobileMenu = () => {
    const [menu, setMenu] = useState<boolean>(false);
    return (
        <>
            <div className="sm:hidden flex flex-row items-center w-full h-[100px] justify-between px-2">

                <div className="flex flex-row gap-1 items-center w-full">
                    <button onClick={() => setMenu(!menu)}><Menu className="w-7 h-7" /></button>
                    <div className="text-lg">Logo</div>
                    <div>Tision Social</div>
                </div>

                <div className="flex flex-row gap-4 items-center">
                    <MessageSquare className="w-7 h-7 text-primary" />
                    <Bell className="w-7 h-7 text-primary" />
                    <UserCircle className="w-7 h-7 text-text-color" />
                </div>
            </div>

            {/* Render the side menu with AnimatePresence */}
            <MobileSideMenu visible={menu} onClose={() => setMenu(false)} />
        </>
    )
}

export default MobileMenu