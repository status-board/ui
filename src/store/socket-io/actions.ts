import SocketIO from 'socket.io-client';
import { Action, Dispatch } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import guessWSURL from '../../utilities/WSHelper';
import ConnectionStatus from '../../components/ConnectionStatus';
import { setDashboards } from '../dashboards/actions';
import { fetchConfigurationSuccess } from '../configuration/actions';
import {
    notifySuccess,
    notifyWarning,
    updateNotification,
    closeNotification,
} from '../notifications/actions';
import {
    allSubscriptionsUnsubscribed,
    apiFailure,
    receiveApiData,
    sendPendingSubscriptions,
} from '../api/actions';
import {
    WS_CONNECT,
    WS_CONNECT_SUCCESS,
    WS_DISCONNECTED,
    WS_MAX_RETRIES,
    WS_NOTIFICATION_ID,
    WS_RETRY_DELAY,
    WS_STATUS_CONNECTED,
    WS_STATUS_DELAYING,
    WS_STATUS_FAILED,
} from './types';
import {
    Configuration,
    RootState,
} from '../../types';
import {
    NOTIFICATION_STATUS_ERROR,
    NOTIFICATION_STATUS_SUCCESS,
} from '../notifications/types';

const connectSuccess = () => (dispatch: ThunkDispatch<RootState, null, Action>) => {
    dispatch({ type: WS_CONNECT_SUCCESS });
    dispatch(sendPendingSubscriptions());
};

const disconnected = () => (dispatch: Dispatch<Action>) => {
    dispatch({ type: WS_DISCONNECTED });
    dispatch(allSubscriptionsUnsubscribed());
};

let socket: any;

export const send = (type: any, data: any) => () => {
    socket.emit(type, data);
};

export const connect = (configuration: Configuration) => {
    const wsUrl = guessWSURL(configuration);
    const reconnectionAttempts = 'reconnectionAttempts' in configuration
        ? configuration.reconnectionAttempts
        : WS_MAX_RETRIES;
    return (dispatch: ThunkDispatch<RootState, null, Action>) => {
        dispatch({
            type: WS_CONNECT,
            wsUrl,
        });
        socket = SocketIO(wsUrl, {
            transports: ['websocket'],
            reconnection: true,
            reconnectionAttempts,
            reconnectionDelay: WS_RETRY_DELAY,
            reconnectionDelayMax: WS_RETRY_DELAY,
            randomizationFactor: 0,
        });

        socket.on('connect', () => {
            dispatch(connectSuccess());
        });

        socket.on('api.data', (data: any) => {
            if (data) dispatch(receiveApiData(data));
        });

        socket.on('api.error', (data: any) => {
            if (data) dispatch(apiFailure(data));
        });

        socket.on('error', (error: any) => {
            console.error('Socket error', error.code, error);
        });

        // eslint-disable-next-line no-shadow
        socket.on('configuration', (configuration: Configuration) => {
            dispatch(fetchConfigurationSuccess(configuration));
            dispatch(setDashboards(configuration.dashboards));
            dispatch(
                notifySuccess({
                    message: 'configuration updated',
                    ttl: 2000,
                }),
            );
        });

        socket.on('disconnect', () => {
            console.warn('disconnected');
            dispatch(disconnected());
            dispatch(
                notifyWarning({
                    id: WS_NOTIFICATION_ID,
                    component: ConnectionStatus,
                    ttl: -1,
                    props: {
                        reconnectionAttempts,
                        retryCount: 0,
                        status: WS_STATUS_DELAYING,
                    },
                }),
            );
        });

        socket.on('reconnecting', (attempt: number) => {
            dispatch(
                updateNotification(WS_NOTIFICATION_ID, {
                    props: {
                        retryCount: attempt,
                        status: WS_STATUS_DELAYING,
                    },
                }),
            );
        });

        socket.on('reconnect_failed', () => {
            dispatch(
                updateNotification(WS_NOTIFICATION_ID, {
                    status: NOTIFICATION_STATUS_ERROR,
                    props: {
                        retryCount: WS_MAX_RETRIES,
                        status: WS_STATUS_FAILED,
                    },
                }),
            );
        });

        socket.on('reconnect', () => {
            dispatch(
                updateNotification(WS_NOTIFICATION_ID, {
                    status: NOTIFICATION_STATUS_SUCCESS,
                    props: {
                        status: WS_STATUS_CONNECTED,
                    },
                }),
            );
            dispatch(closeNotification(WS_NOTIFICATION_ID, 2000));
        });
    };
};
