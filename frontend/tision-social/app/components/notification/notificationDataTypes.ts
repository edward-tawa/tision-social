export type Actor = {
    id: number;
    name: string;
    avatar: string;
}


export type NotificationType = | 'info' | 'warning' | 'error' | 'success' | 'default' | 'general'
    | 'like' | 'dislike' | 'comment' | 'follow' | 'unfollow' | 'message'
    | 'mention' | 'friendRequest' | 'groupInvite';




export type NotificationTypeData = {
    info: {
        userId: number;
        content: string;
    };
    warning: {
        userId: number;
        content: string;
    };
    error: {
        userId: number;
        content: string;
    };
    success: {
        userId: number;
        content: string;
    };
    default: {
        userId: number;
        content: string;
    };
    like: {
        postId: number;
        userId: number;
        likerId: number;
    };
    dislike: {
        postId: string;
        userId: number;
        dislikerId: number;
    };
    comment: {
        postId: number;
        userId: number;
        commenterId: number;
        commentId: number;
    };
    follow: {
        userId: number;
        followedId: number;
    };
    unfollow: {
        userId: number;
        unfollowedId: number;
    };
    message: {
        userId: number;
        senderId: number;
        content: string;
    };
    mention: {
        postId: number;
        userId: number;
        mentionerId: number;
    };
    friendRequest: {
        userId: number;
        requesterId: number;
    };
    groupInvite: {
        groupId: number;
        userId: number;
        inviterId: number;
    }

}