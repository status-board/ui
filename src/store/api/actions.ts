import { Action, Dispatch } from 'redux';
import filter from 'lodash/filter';
import forEach from 'lodash/forEach';
import get from 'lodash/get';
import has from 'lodash/has';

import { send } from '../socket-io/actions';
import { RootState } from '../../types';
import {
    AllSubscriptionsUnsubscribedAction,
    API_ALL_UNSUBSCRIBED,
    API_DATA,
    API_FAILURE,
    API_SUBSCRIBE,
    API_SUBSCRIBED,
    API_UNSUBSCRIBE,
    ApiFailureAction,
    ReceiveApiDataAction,
    SubscribedToApiAction, SubscribeToApiAction,
    Subscription,
} from './types';

export const subscribedToApi = (subscription: Subscription): SubscribedToApiAction => ({
    type: API_SUBSCRIBED,
    subscription,
});

export const allSubscriptionsUnsubscribed = (): AllSubscriptionsUnsubscribedAction => ({
    type: API_ALL_UNSUBSCRIBED,
});

export const subscribeToApi = (subscription: Subscription) => (
    dispatch: Dispatch<Action>,
    getState: () => RootState,
): SubscribeToApiAction | undefined => {
    const { api, ws } = getState();

    if (!has(api, `subscriptions[${subscription.id}]`)) {
        dispatch({ type: API_SUBSCRIBE, subscription });

        if (!ws.connected) return;

        send('api.subscription', subscription);
        dispatch(subscribedToApi(subscription));
    }
};

export const sendPendingSubscriptions = () => (
    dispatch: Dispatch<Action>,
    getState: () => RootState,
) => {
    const { api, ws } = getState();

    if (!ws.connected) {
        // eslint-disable-next-line no-console
        console.error('Cannot send pending subscriptions as ws is disconnected!');
        return;
    }

    const subscriptions = get(api, 'subscriptions');
    filter(subscriptions, (subscription: Subscription): boolean => !subscription.hasSubscribed);
    forEach(subscriptions, (subscription: Subscription) => {
        send('api.subscription', subscription);
        dispatch(subscribedToApi(subscription));
    });
};

export const unsubscribeFromApi = (id: string) => (
    dispatch: Dispatch<Action>,
    getState: () => RootState,
) => {
    const { api } = getState();
    if (has(api, `subscriptions[${id}]`)) {
        send('api.unsubscription', { id });
    }

    dispatch({
        type: API_UNSUBSCRIBE,
        id,
    });
};

interface ApiDate {
    id: string;
    data: {
        message: string;
    };
}

export const receiveApiData = ({ id, data }: ApiDate): ReceiveApiDataAction => ({
    type: API_DATA,
    id,
    data,
});

export const apiFailure = ({ id, data }: ApiDate): ApiFailureAction => ({
    type: API_FAILURE,
    id,
    data,
});
