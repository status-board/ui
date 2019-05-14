export interface Subscription {
    id: string;
    params?: {
        owner?: string;
        organization?: string;
        repository?: string;
        limit?: number;
        user?: string;
    };
    hasSubscribed?: boolean;
}

export interface Subscriptions {
    [key: string]: Subscription;
}

export interface Data {
    [key: string]: {
        [key: string]: any;
    };
}

export interface Errors {
    [key: string]: {
        message: string;
    };
}

export interface ApiState {
    readonly subscriptions: Subscriptions;
    readonly data: Data;
    readonly errors: Errors;
}

export const API_SUBSCRIBE = 'API_SUBSCRIBE';
export const API_SUBSCRIBED = 'API_SUBSCRIBED';
export const API_UNSUBSCRIBE = 'API_UNSUBSCRIBE';
export const API_ALL_UNSUBSCRIBED = 'API_ALL_UNSUBSCRIBED';
export const API_DATA = 'API_DATA';
export const API_FAILURE = 'API_FAILURE';

export interface SubscribeToApiAction {
    type: typeof API_SUBSCRIBE;
    subscription: Subscription;
}

export interface SubscribedToApiAction {
    type: typeof API_SUBSCRIBED;
    subscription: Subscription;
}

export interface AllSubscriptionsUnsubscribedAction {
    type: typeof API_ALL_UNSUBSCRIBED;
}

export interface ReceiveApiDataAction {
    type: typeof API_DATA;
    id: string;
    data: {
        message: string;
    };
}

export interface ApiFailureAction {
    type: typeof API_FAILURE;
    id: string;
    data: {
        message: string;
    };
}

export type ApiActionTypes =
    SubscribeToApiAction
    | SubscribedToApiAction
    | AllSubscriptionsUnsubscribedAction
    | ReceiveApiDataAction
    | ApiFailureAction;
