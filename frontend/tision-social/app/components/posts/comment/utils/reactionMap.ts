import { Reaction } from "@/app/data/post/comment/reaction/types";
//function that creates a reaction object based on the reaction type
export const reactionRenderMap = (reaction: string, targetId: number, reactorId: number, emojiValue?: string,): Reaction => {

    const base = {
        id: Date.now(),
        reactorId,
        targetId,
        createdAt: new Date().toISOString(),
    };
    switch (reaction) {
        case "like":
            return {
                ...base,
                type: "like",
                content: { status: true, type: "like" },
            };

        case "dislike":
            return {
                ...base,
                type: "dislike",
                content: { status: true, type: "dislike" },
            };

        case "emoji":
            return {
                ...base,
                type: "emoji",
                content: { value: emojiValue || "", type: "emoji" },
            };

        default:
            throw new Error(`Unsupported reaction type: ${reaction}`);
    }
}