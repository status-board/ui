import {
    NOTIFICATION_CLOSE,
    NOTIFICATION_UPDATE,
    NOTIFY,
} from './types';
import { Notifications } from '../../types';

export default function notifications(
    state: Notifications = {
        items: [],
    },
    action: any,
) {
    switch (action.type) {
        case NOTIFY:
            return {
                ...state,
                items: [action.notification, ...state.items],
            };

        case NOTIFICATION_UPDATE:
            return {
                ...state,
                items: state.items.map((notification) => {
                    if (notification.id === action.id) {
                        return {
                            ...notification,
                            ...action.notification,
                        };
                    }

                    return notification;
                }),
            };

        case NOTIFICATION_CLOSE:
            return {
                ...state,
                items: state.items.filter(({ id }) => id !== action.id),
            };

        default:
            return state;
    }
}
