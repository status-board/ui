import has from 'lodash/has';
import find from 'lodash/find';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import {
    NOTIFY,
    NOTIFICATION_CLOSE,
    NOTIFICATION_UPDATE,
    NOTIFICATION_DEFAULT_TTL,
    NOTIFICATION_STATUS_UNKNOWN,
    NOTIFICATION_STATUS_SUCCESS,
    NOTIFICATION_STATUS_WARNING,
    NOTIFICATION_STATUS_ERROR,
    UpdateNotificationAction,
    CloseNotificationAction,
    NotificationAction,
} from './types';
import {
    RootState,
    Notification,
} from '../../types';

const uid = () => Math.random().toString(34).slice(2);

const timers: { [key: string]: number } = {};

const clearTimer = (id: string) => {
    if (timers[id]) {
        clearTimeout(timers[id]);
        delete timers[id];
    }
};

export const updateNotification = (
    id: string,
    notification: Notification,
): UpdateNotificationAction => ({
    type: NOTIFICATION_UPDATE,
    id,
    notification,
});

const addNotification = (notification: Notification): NotificationAction => ({
    type: NOTIFY,
    notification,
});

const close = (id: string): CloseNotificationAction => ({
    type: NOTIFICATION_CLOSE,
    id,
});

export const closeNotification = (id: string, delay = 0) => (dispatch: any) => {
    if (delay > 0) {
        clearTimer(id);
        timers[id] = window.setTimeout(() => {
            dispatch(close(id));
        }, delay);
    } else {
        dispatch(close(id));
    }
};

export const notify = (notification: Notification) => (
    dispatch: ThunkDispatch<RootState, null, Action>,
    getState: () => RootState,
) => {
    const {
        notifications: { items },
    } = getState();

    if (!has(notification, 'id')) {
        // TODO: Remove ESLint disable no-param-reassign.
        // eslint-disable-next-line no-param-reassign
        notification.id = uid();
    }

    const existingNotification = find(items, { id: notification.id });
    if (existingNotification && notification.id) {
        dispatch(updateNotification(notification.id, notification));
    } else {
        if (!has(notification, 'ttl')) {
            // TODO: Remove ESLint disable no-param-reassign.
            // eslint-disable-next-line no-param-reassign
            notification.ttl = NOTIFICATION_DEFAULT_TTL;
        }

        if (!notification.status) {
            // TODO: Remove ESLint disable no-param-reassign.
            // eslint-disable-next-line no-param-reassign
            notification.status = NOTIFICATION_STATUS_UNKNOWN;
        }

        dispatch(addNotification(notification));

        if (notification.id && notification.ttl && notification.ttl >= 0) {
            dispatch(closeNotification(notification.id, notification.ttl));
        }
    }
};

export const notifySuccess = (notification: Notification) => (dispatch: any) => {
    dispatch(
        notify({
            ...notification,
            status: NOTIFICATION_STATUS_SUCCESS,
        }),
    );
};

export const notifyWarning = (notification: Notification) => (dispatch: any) => {
    dispatch(
        notify({
            ...notification,
            status: NOTIFICATION_STATUS_WARNING,
        }),
    );
};

export const notifyError = (notification: Notification) => (dispatch: any) => {
    dispatch(
        notify({
            ...notification,
            status: NOTIFICATION_STATUS_ERROR,
        }),
    );
};
