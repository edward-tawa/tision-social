"use client";
import React from 'react'
import { MessageCircle } from 'lucide-react';
import FloatingChat from "@/app/components/chat/FloatingChat";
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setChatVisible, setChatPosition } from "@/app/data/store/slices/chat/chatVisibleSlice";
import { RootState } from '@/app/data/store/store';




const FloatingIcon = () => {
    const { isVisible, position } = useSelector((state: RootState) => state.chatVisibleStateSlice);
    const iconRef = useRef<HTMLDivElement>(null);
    const dispatch = useDispatch();
    const handleChatIconClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
        if (!iconRef.current) return;
        const iconPosition = iconRef.current.getBoundingClientRect();
        const newPosition = {
            bottom: window.innerHeight - iconPosition.top + 8, // a bit of spacing
            right: window.innerWidth - iconPosition.right - 11
        }
        dispatch(setChatPosition(newPosition));
        dispatch(setChatVisible({ isVisible: !isVisible }));
    }
    return (
        <>
            <div className="fixed bottom-5 right-5 z-50 shadow-lg bg-white rounded-full p-2 cursor-pointer"
                onClick={handleChatIconClick} ref={iconRef}>
                <MessageCircle className="w-8 h-8 text-secondary" />
            </div>
            {isVisible && (
                <FloatingChat isVisible={isVisible} position={position} />
            )}
        </>
    )

}

export default FloatingIcon