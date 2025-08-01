"use client";
import React from 'react';
import { Copyright } from 'lucide-react';
import { Eye, Feather, Shield } from 'lucide-react';
import { useRef, useEffect } from 'react';
import { setSticky, setPosition } from '@/app/data/store/slices/footer/footerSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/data/store/store';


const SideFooter = () => {
    const footerRef = useRef<HTMLDivElement>(null)
    const dispatch = useDispatch()
    const { isSticky, position } = useSelector((state: RootState) => state.footerSlice);
    useEffect(() => {
        let timeoutId: NodeJS.Timeout;
        const calculateFooterStickyPosition = (event: Event) => {
            if (!footerRef.current)
                return
            const rect = footerRef.current.getBoundingClientRect()
            if (Math.round(rect.top) <= 0) {
                //dispatch an action to the state
                const newPosition = { bottom: rect.bottom }
                dispatch(setSticky(true))
                dispatch(setPosition(newPosition))

                timeoutId = setTimeout(() => {
                    dispatch(setSticky(false));
                }, 3000);
            }
        }
        document.addEventListener("scroll", calculateFooterStickyPosition)

        return () => {
            document.removeEventListener("scroll", calculateFooterStickyPosition)
        }
    }, [isSticky, dispatch])
    return (

        <footer className={`bg-white rounded-lg text-text-color min-h-35 px-3 py-2 
        
        ${isSticky ? 'fixed bottom-0' : 'relative'} `} ref={footerRef}>
            <div className="text-[20px] text-text-color font-serif">
                <span className="text-text-color font-serif text-sm">Tision Technologies</span>
            </div>
            <div className="flex flex-col items-center justify-center gap-2">
                <div className="text-sm text-center flex flex-row items-center gap-1">
                    <div>
                        <Copyright className="text-black h-3 w-3" /></div>
                    <div>
                        {new Date().getFullYear()} Tision Technologies. All rights reserved.
                    </div>
                </div>
                <div className="flex flex-row items-center justify-center gap-3 text-sm">
                    <a href="/about" className="hover:underline">About</a>
                    <a href="/contact" className="hover:underline">Contact</a>
                    <a href="/privacy" className="hover:underline">Privacy Policy</a>
                </div>
                <div className="text-[20px] text-white font-seif flex flex-row items-center justify-center gap-4">
                    <div><Eye className="h-4 w-4 text-secondary" /> </div>
                    <div><Feather className="h-4 w-4 text-secondary" /></div>
                    <div><Shield className="h-4 w-4 text-secondary" /></div>
                </div>
            </div>
        </footer>
    )
}

export default SideFooter