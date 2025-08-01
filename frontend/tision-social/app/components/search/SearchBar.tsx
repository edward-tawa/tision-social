import React from 'react'
import { useState, useEffect, useRef } from 'react'
import { Search } from 'lucide-react'

const SearchBar = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const searchRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        const handleClickOutside = (event: Event) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }

        };
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [])

    return (
        <div className="relative flex items-center" ref={searchRef}>
            <Search onClick={() => setIsOpen(!isOpen)} className="text-white h-6 w-6 cursor-pointer" />
            {isOpen && (
                <input

                    className="absolute right-6 w-48 bg-white rounded-md shadow-md focus:outline-none transition-all duration-300 px-1"
                    placeholder="search"
                />
            )}
        </div>
    )
}

export default SearchBar