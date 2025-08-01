import { getMessage, createMessage, updateMessage, deleteMessage, getMessages } from "@/app/data/message/api";
import { MessageUnion } from "@/app/data/message/types";


export const getMessageService = async (messageId: number) => {
    return await getMessage(messageId);
}

export const getMessagesService = async (userId: number) => {
    return await getMessages(userId);
}

export const createMessageService = async (message: MessageUnion) => {
    return await createMessage(message);
}

export const updateMessageService = async (messageId: number, message: Partial<MessageUnion>) => {
    return await updateMessage(messageId, message);
}

export const deleteMessageService = async (messageId: number) => {
    return await deleteMessage(messageId);
}