import React, { createElement } from 'react';
import { Notification } from '../../types';
import Item from './Item';

interface Props {
    notification: Notification;
}

export default function NotificationsItem({ notification }: Props) {
    let content;
    if (notification.component) {
        const notificationProps = Object.assign(
            {},
            { ...notification.props },
        );

        content = createElement(notification.component, notificationProps);
    } else {
        content = notification.message;
    }

    return <Item>{content}</Item>;
}
