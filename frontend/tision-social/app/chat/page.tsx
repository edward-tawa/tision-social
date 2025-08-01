"use client";
import React, { useEffect } from 'react'
import ChattList from '@/app/components/chat/ChattList';
import { useSelector, useDispatch } from 'react-redux';
import PageWrapper from "@/app/components/layout/PageWrapper";
import { dummyMessages } from "@/app/data/message/dummyMessages";
import { addMessages } from "@/app/data/message/messageSlice";
import { allMessagesSelector } from "@/app/data/message/selectors";


//dispatching messages in useEffect for testing purpose
const page = () => {
    const messages = useSelector(allMessagesSelector)
    const dispatch = useDispatch();
    useEffect(() => {
        if (messages.length === 0) {
            dispatch(addMessages(dummyMessages));
        }
    }, [dispatch, messages.length]);



    return (
        <PageWrapper>
            <div className="flex flex-col h-[calc(100vh-103px)] overflow-y-auto pb-4 custom-scrollbar">

                <div className="sticky top-0 z-40">
                    <div className="py-2 px-2">
                        <h1 className="font-bold text-lg">Chat</h1>
                    </div>
                </div>

                <div className="flex-1 h-[50vh]">
                    <ChattList />
                </div>
            </div>
        </PageWrapper>

    )
}

export default page