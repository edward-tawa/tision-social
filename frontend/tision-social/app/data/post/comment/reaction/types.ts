type Like = {
    status: boolean;
    type: "like";
}

type Dislike = {
    status: boolean;
    type: "dislike";
}

type Emoji = {
    value: string;
    type: "emoji";
}

interface ReactionCombo {
    like: Like;
    dislike: Dislike;
    emoji: Emoji;
}


export interface GenericReaction<T extends keyof ReactionCombo> {
    id: number;
    reactorId: number;
    targetId: number;
    type: T;
    content: ReactionCombo[T];
    createdAt: string;
}


export type Reaction = {
    [T in keyof ReactionCombo]: GenericReaction<T>;
}[keyof ReactionCombo];


