import React from "react";
import { Actor, NotificationTypeData, NotificationType } from "./notificationDataTypes";

{/** 
    1. i am designing a notification for my system.
    2. Are there different types of this notification? yes there are. 
    3.What are the different types of this notification? I list the types of notifications. 
    4.How are these Notifications different from each other?what is common in all these notifications and what is different.Make the part that is different generic. data of notification is different for each type of notification. so i need the data structure for each notification type the system will have so that each type will have its own data structure.

    5. how can combine all the notification types into one generic notification
    6.I can use this generic notification for rendering in component
    
**/}

export type Notification<TType extends keyof NotificationTypeData, Actor> = {
    id: string;
    read: boolean;
    timestamp: string;
    actor: Actor;
    type: TType;
    data: NotificationTypeData[TType];
}

export type NotificationUnion = {
    [TType in keyof NotificationTypeData]: Notification<TType, Actor>
}[keyof NotificationTypeData];


export type NotificationCardProps = {
    notification: NotificationUnion;
}

const renderMap: { [TType in keyof NotificationTypeData]: React.FC<{ notification: Notification<TType, Actor> }> } = {
    info: ({ notification }) => <div className="bg-white rounded-lg px-2 py-2">Info: {notification.data.content}</div>,
    warning: ({ notification }) => <div className="bg-white rounded-lg px-2 py-2">Warning: {notification.data.content}</div>,
    error: ({ notification }) => <div className="bg-white rounded-lg px-2 py-2">Error: {notification.data.content}</div>,
    success: ({ notification }) => <div className="bg-white rounded-lg px-2 py-2">Success: {notification.data.content}</div>,
    default: ({ notification }) => <div className="bg-white rounded-lg px-2 py-2">Default: {notification.data.content}</div>,
    like: ({ notification }) => <div className="bg-white rounded-lg px-2 py-2">{notification.actor.name} liked your post.</div>,
    dislike: ({ notification }) => <div className="bg-white rounded-lg px-2 py-2">{notification.actor.name} disliked your post.</div>,
    comment: ({ notification }) => <div className="bg-white rounded-lg px-2 py-2">{notification.actor.name} commented on your post.</div>,
    follow: ({ notification }) => <div className="bg-white rounded-lg px-2 py-2">{notification.actor.name} started following you.</div>,
    unfollow: ({ notification }) => <div className="bg-white rounded-lg px-2 py-2">{notification.actor.name} unfollowed you.</div>,
    message: ({ notification }) => <div className="bg-white rounded-lg px-2 py-2">You have a new message from {notification.actor.name}.</div>,
    mention: ({ notification }) => <div className="bg-white rounded-lg px-2 py-2">{notification.actor.name} mentioned you in a post.</div>,
    friendRequest: ({ notification }) => <div className="bg-white rounded-lg px-2 py-2">{notification.actor.name} sent you a friend request.</div>,
    groupInvite: ({ notification }) => <div className="bg-white rounded-lg px-2 py-2">{notification.actor.name} invited you to a group.</div>

}


const NotificationCard = ({ notification }: NotificationCardProps) => {
    const type = notification.type;
    const RenderComponent = renderMap[type] as React.FC<{ notification: typeof notification }>;
    return (
        <div>
            <RenderComponent notification={notification} />
        </div>
    )
}

export default NotificationCard



