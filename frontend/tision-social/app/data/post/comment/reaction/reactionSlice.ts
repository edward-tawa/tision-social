import { Reaction } from "@/app/data/post/comment/reaction/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
    getReactionThunk,
    getReactionsThunk,
    createReactionThunk,
    updateReactionThunk,
    deleteReactionThunk,
} from "@/app/data/post/comment/reaction/thunk";


interface NormalizedState {
    byId: Record<number, Reaction>;
    reactionIds: number[];
}

interface ReactionState {
    reaction: Reaction;
    reactions: NormalizedState;
    loading: boolean;
    error?: string;
}

const initialReaction: Reaction = {
    id: Date.now(),
    targetId: Date.now(),
    reactorId: Date.now(),
    type: "like",
    content: {
        type: "like",
        status: false,
    },
    createdAt: Date.now().toString(),
};

const initialState: ReactionState = {
    reaction: initialReaction,
    reactions: {
        byId: {},
        reactionIds: [],
    },
    loading: false,
    error: undefined,
}


export const reactionSlice = createSlice({
    name: "reactionSlice",
    initialState,
    reducers: {
        setReaction: (state, action: PayloadAction<Reaction>) => {
            state.reaction = action.payload;
        },
        addReaction: (state, action: PayloadAction<Reaction>) => {
            const reaction = action.payload;
            state.reactions.byId[reaction.id] = reaction;
            state.reactions.reactionIds.push(reaction.id);
        },
        addReactions: (state, action: PayloadAction<Reaction[]>) => {
            action.payload.forEach(reaction => {
                state.reactions.byId[reaction.id] = reaction;
                if (!state.reactions.reactionIds.includes(reaction.id)) {
                    state.reactions.reactionIds.push(reaction.id);
                }
            });
        },
        updateReaction: (state, action: PayloadAction<Reaction>) => {
            const updatedReaction = action.payload;
            if (state.reactions.byId[updatedReaction.id]) {
                state.reactions.byId[updatedReaction.id] = updatedReaction;
            }
        },
        deleteReaction: (state, action: PayloadAction<number>) => {
            const reactionId = action.payload;
            delete state.reactions.byId[reactionId];
            state.reactions.reactionIds = state.reactions.reactionIds.filter(id => id !== reactionId);
        },

    },
    extraReducers: (builder) => {
        builder

            // Get single reaction
            .addCase(getReactionThunk.pending, (state) => {
                state.loading = true;
                state.error = undefined;
            })
            .addCase(getReactionThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.reaction = action.payload;
            })
            .addCase(getReactionThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // Get all reactions
            .addCase(getReactionsThunk.pending, (state) => {
                state.loading = true;
                state.error = undefined;
            })
            .addCase(getReactionsThunk.fulfilled, (state, action) => {
                state.loading = false;
                const reactionsArray: Reaction[] = action.payload;
                state.reactions.byId = {};
                state.reactions.reactionIds = [];

                reactionsArray.forEach((reaction) => {
                    state.reactions.byId[reaction.id] = reaction;
                    state.reactions.reactionIds.push(reaction.id);
                });
            })
            .addCase(getReactionsThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // Create reaction
            .addCase(createReactionThunk.pending, (state) => {
                state.loading = true;
                state.error = undefined;
            })
            .addCase(createReactionThunk.fulfilled, (state, action) => {
                state.loading = false;
                const newReaction = action.payload;
                state.reactions.byId[newReaction.id] = newReaction;
                if (!state.reactions.reactionIds.includes(newReaction.id)) {
                    state.reactions.reactionIds.push(newReaction.id);
                }
            })
            .addCase(createReactionThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // Update reaction
            .addCase(updateReactionThunk.pending, (state) => {
                state.loading = true;
                state.error = undefined;
            })
            .addCase(updateReactionThunk.fulfilled, (state, action) => {
                state.loading = false;
                const updated = action.payload;
                state.reactions.byId[updated.id] = updated;
            })
            .addCase(updateReactionThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // Delete reaction
            .addCase(deleteReactionThunk.pending, (state) => {
                state.loading = true;
                state.error = undefined;
            })
            .addCase(deleteReactionThunk.fulfilled, (state, action) => {
                state.loading = false;
                const deletedId = action.payload;
                delete state.reactions.byId[deletedId];
                state.reactions.reactionIds = state.reactions.reactionIds.filter(id => id !== deletedId);
            })
            .addCase(deleteReactionThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    }

})

export const {
    setReaction,
    addReaction,
    addReactions,
    updateReaction,
    deleteReaction,
} = reactionSlice.actions;
export default reactionSlice.reducer;