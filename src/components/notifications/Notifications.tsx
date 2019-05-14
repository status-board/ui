import React from 'react';
import NotificationsItem from './NotificationsItem';
import Wrapper from './NotificationsWrapper';
import { Notification } from '../../types';

export interface NotificationsProps {
    notifications: Notification[];
}

export default function Notifications(props: NotificationsProps) {
    const { notifications } = props;

    return (
        <Wrapper>
            {notifications.map((notification: Notification) => (
                <NotificationsItem
                    key={`notification.${notification.id}`}
                    notification={notification}
                />
            ))}
        </Wrapper>
    );
}
