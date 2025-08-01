//chatlistt
import React from 'react'
import ChattList from '@/app/components/chat/ChattList';
import { RootState } from '@/app/data/store/store';
import { useDispatch, useSelector } from 'react-redux';
import { setChatVisible, setChatPosition } from "@/app/data/store/slices/chat/chatVisibleSlice";


interface FloatingChatProps {
    isVisible: boolean;
    position: {
        bottom?: number;
        right?: number;
    }
}
const FloatingChat = ({ isVisible, position }: FloatingChatProps) => {
    const dispatch = useDispatch();
    return (
        <div className="px-5">
            {isVisible && (
                <div
                    className={`fixed bg-white rounded-lg flex flex-col gap-1 w-[270px] h-[340px] overflow-y-auto custom-scrollbar 
                z-50 py-2 px-3`}
                    style={{ ...position }}>
                    <div className="flex justify-end text-3xl cursor-pointer" onClick={() => dispatch(setChatVisible({ isVisible: false }))}>
                        &times;
                    </div>
                    <ChattList />
                </div>


            )}
        </div>
    )
}
export default FloatingChat