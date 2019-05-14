import difference from 'lodash/difference';
import get from 'lodash/get';
import isObject from 'lodash/isObject';
import keys from 'lodash/keys';
import omit from 'lodash/omit';
import { Action, Dispatch } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import Registry from '../../WidgetsRegistry';
import {
    subscribeToApi,
    unsubscribeFromApi,
} from '../api/actions';
import {
    DashboardPauseAction,
    DASHBOARDS_PAUSE,
    DASHBOARDS_PLAY,
    SET_CURRENT_DASHBOARD,
    SET_DASHBOARDS,
    SetCurrentDashboardAction,
} from './types';
import {
    Dashboard,
    RootState,
    Widget,
} from '../../types';


const ignoreProps = ['extension', 'widget', 'x', 'y', 'columns', 'rows'];

let timer: any;

const SECOND = 1000;

export const setDashboards = (dashboards: Dashboard[]) => (
    dispatch: ThunkDispatch<RootState, null, Action>,
    getState: () => RootState,
) => {
    const { api } = getState();
    const currentSubscriptionsIds = keys(get(api, 'subscriptions'));
    const newSubscriptionsIds: string[] = [];

    dashboards.forEach((dashboard: Dashboard, dahsboardIndex: number) => {
        dashboard.widgets.forEach((w: Widget, widgetIndex: number) => {
            if (Registry.has(w.extension, w.widget)) {
                const component = Registry.getComponent(w.extension, w.widget);

                if (typeof component.getApiRequest === 'function') {
                    const childProps = omit(w, ignoreProps);
                    const subscription = component.getApiRequest(childProps);

                    if (!isObject(subscription) || !subscription.id) {
                        // eslint-disable-next-line no-console
                        console.error(
                            `widget ${w.extension}.${w.widget} 'getApiRequest()' must return an object with an 'id' property`,
                        );
                    } else {
                        // eslint-disable-next-line no-param-reassign
                        dashboards[dahsboardIndex]
                            .widgets[widgetIndex]
                            .subscriptionId = subscription.id;
                        dispatch(subscribeToApi(subscription));
                        newSubscriptionsIds.push(subscription.id);
                    }
                }
            }
        });
    });

    const staleSubscriptionsIds = difference(currentSubscriptionsIds, newSubscriptionsIds);
    staleSubscriptionsIds.forEach((id) => {
        dispatch(unsubscribeFromApi(id));
    });

    dispatch({ type: SET_DASHBOARDS, dashboards });
};

const setCurrentDashboard = (index: any): SetCurrentDashboardAction => ({
    type: SET_CURRENT_DASHBOARD,
    index,
});

export const previous = () => (
    dispatch: Dispatch<Action>,
    getState: () => RootState,
) => {
    const {
        dashboards: { dashboards, current },
    } = getState();

    let prevIndex;
    if (current > 0) {
        prevIndex = current - 1;
    } else {
        prevIndex = dashboards.length - 1;
    }

    dispatch(setCurrentDashboard(prevIndex));
};

export const next = () => (
    dispatch: ThunkDispatch<RootState, null, Action>,
    getState: () => RootState,
) => {
    const {
        configuration: { configuration },
        dashboards: { dashboards, current, isPlaying },
    } = getState();
    const { rotationDuration } = configuration;

    let nextIndex;
    if (current < dashboards.length - 1) {
        nextIndex = current + 1;
    } else {
        nextIndex = 0;
    }

    dispatch(setCurrentDashboard(nextIndex));

    if (isPlaying) {
        clearTimeout(timer);
        timer = setTimeout(() => {
            dispatch(next());
        }, Number(rotationDuration) * SECOND);
    }
};

export const play = () => {
    clearTimeout(timer);

    return (
        dispatch: ThunkDispatch<RootState, null, Action>,
        getState: () => RootState,
    ) => {
        const {
            configuration: { configuration },
            dashboards: { dashboards },
        } = getState();
        const { rotationDuration } = configuration;

        if (dashboards.length > 1) {
            dispatch({ type: DASHBOARDS_PLAY });
            timer = setTimeout(() => {
                dispatch(next());
            }, Number(rotationDuration) * SECOND);
        }
    };
};

export const pause = (): DashboardPauseAction => {
    clearTimeout(timer);

    return {
        type: DASHBOARDS_PAUSE,
    };
};
