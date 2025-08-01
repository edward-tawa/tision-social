export type messageTypeData = {
    text: {
        content: string;
    };

    image: {
        text?: string;
        image: string;
    };

    video: {
        text?: string;
        video: string;
    };

    audio: {
        text?: string;
        audio: string;
    }

}

export type GenericMessage<TType extends keyof messageTypeData> = {
    id: number;
    senderId: number;
    receiverId: number;
    timestamp: string;
    type: TType;
    content: messageTypeData[TType];
}

//all possible types of messages structure GenericMessage<TType>
export type MessageUnion = {

    [TType in keyof messageTypeData]: GenericMessage<TType>

}[keyof messageTypeData]







