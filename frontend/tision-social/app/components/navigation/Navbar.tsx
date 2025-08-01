"use client"
import React from 'react'
import PCMenu from './PCMenu';
import MobileMenu from './MobileMenu';


const Navbar = () => {
    return (
        <nav className="bg-secondary fixed top-0 z-50 flex items-center h-[100px] w-full px-4">
            <PCMenu />
            <MobileMenu />
        </nav>
    )
}

export default Navbar
