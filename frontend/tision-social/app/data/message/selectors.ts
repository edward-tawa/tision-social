import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@/app/data/store/store";
import { MessageUnion } from "@/app/data/message/types";


const messagesSelector = (state: RootState): MessageUnion[] => state.messageSlice.messages.messageIds.map(id => state.messageSlice.messages.byId[id])
const messageIds = (state: RootState) => state.messageSlice.messages.messageIds;

export const chatKey = (message: MessageUnion): string => {
    const chatKey = [message.senderId, message.receiverId].sort((a, b) => a - b).join("-");
    return chatKey;
}


export const allMessagesSelector = createSelector(
    [messagesSelector],
    (all): Extract<MessageUnion, { type: "text" }>[] =>
        all.filter((msg): msg is Extract<MessageUnion, { type: "text" }> => msg.type === "text")
);


export const chatKeyToMessagesMap = createSelector(
    [messagesSelector],
    (allmessages) => {
        const chatKeyToMessageMap: Record<string, Extract<MessageUnion, { type: "text" }>[]> = {}
        allmessages.forEach(msg => {
            if (msg.type !== "text") return;
            const chatkey = chatKey(msg);
            if (!chatKeyToMessageMap[chatkey]) {
                chatKeyToMessageMap[chatkey] = [];
            }
            chatKeyToMessageMap[chatkey].push(msg);

        })
        Object.keys(chatKeyToMessageMap).forEach(key => {
            chatKeyToMessageMap[key].sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
        })
        return chatKeyToMessageMap;
    }
)

//check if a message is in chat
export const checkKey = (key: string) => createSelector(
    [chatKeyToMessagesMap],
    (map) => {
        if (map[key]) {
            return true;
        }
        return false;
    }
)