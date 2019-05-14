import { Notification } from '../../types';

export const NOTIFY = 'NOTIFY';
export const NOTIFICATION_UPDATE = 'NOTIFICATION_UPDATE';
export const NOTIFICATION_CLOSE = 'NOTIFICATION_CLOSE';

export const NOTIFICATION_STATUS_UNKNOWN = 'unknown';
export const NOTIFICATION_STATUS_SUCCESS = 'success';
export const NOTIFICATION_STATUS_WARNING = 'warning';
export const NOTIFICATION_STATUS_ERROR = 'error';

export const NOTIFICATION_DEFAULT_TTL = 5000;

export interface NotificationAction {
    type: typeof NOTIFY;
    notification: Notification;
}

export interface UpdateNotificationAction {
    type: typeof NOTIFICATION_UPDATE;
    id: string;
    notification: Notification;
}

export interface CloseNotificationAction {
    type: typeof NOTIFICATION_CLOSE;
    id: string;
}

export type NotificationActionTypes =
    NotificationAction
    | UpdateNotificationAction
    | CloseNotificationAction
