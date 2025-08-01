"use client";
import React from 'react'
import { useEffect, useRef } from 'react';
import { hideMenu } from "@/app/data/store/menuVisibleSlice";
import Link from 'next/link';
import { useDispatch } from 'react-redux';

interface AccountMenuProps {
    show: boolean;
    style?: React.CSSProperties;
}

const AccountMenu: React.FC<AccountMenuProps> = ({ show, style }) => {
    const clickRef = useRef<HTMLUListElement>(null);
    const dispatch = useDispatch();
    useEffect(() => {
        const clickOutside = (event: Event) => {
            if (clickRef.current && !clickRef.current.contains(event.target as Node)) {

                dispatch(hideMenu());
            }
        };

        document.addEventListener("mousedown", clickOutside);

        return () => {
            document.removeEventListener("mousedown", clickOutside);
        }
    }, [show])
    if (!show) return null;
    return (
        <ul className="menu bg-secondary text-white w-32 rounded-md px-8 flex flex-col gap-3 py-2 hover:cursor-pointer" style={style} ref={clickRef}>
            <li className=""><Link href="/profile">Profile</Link></li>
            <li className=""><Link href="/activity">Activity</Link></li>
            <li className=""><a>Settings</a></li>
            <li className=""><a>Log Out</a></li>
        </ul>


    )
}

export default AccountMenu