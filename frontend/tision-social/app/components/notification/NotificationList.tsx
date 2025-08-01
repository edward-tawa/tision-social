import React from 'react'
import NotificationCard from '@/app/components/notification/NotificationCard';
import { NotificationUnion } from '@/app/components/notification/NotificationCard';


interface Notifications {
    notifications: NotificationUnion[];
}


const NotificationList = ({ notifications }: Notifications) => {
    return (
        <div className="flex flex-col w-full h-full items-center">
            <div className="flex flex-col w-full max-w-2xl gap-4">
                {notifications.map((notification) => (
                    <NotificationCard key={notification.id} notification={notification} />
                ))}
            </div>
        </div>
    )
}

export default NotificationList