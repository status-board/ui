import { connect } from '../socket-io/actions';
import { setDashboards, play } from '../dashboards/actions';
import { notifySuccess, notifyError } from '../notifications/actions';
import { FETCH_CONFIGURATION, FETCH_CONFIGURATION_FAILURE, FETCH_CONFIGURATION_SUCCESS } from './types';
import { Configuration } from '../../types';

export const fetchConfigurationSuccess = (configuration: Configuration) => ({
    type: FETCH_CONFIGURATION_SUCCESS,
    configuration,
});

const fetchConfigurationFailure = (error: any) => ({
    type: FETCH_CONFIGURATION_FAILURE,
    error,
});

export const fetchConfiguration = () => (dispatch: any) => {
    dispatch({ type: FETCH_CONFIGURATION });

    return fetch('/config')
        .then((res: any) => {
            if (res.status !== 200) {
                return Promise.reject(
                    new Error(
                        `Unable to fetch configuration: ${res.statusText} (${res.status})`,
                    ),
                );
            }

            return res.json();
        })
        .then((configuration: Configuration) => {
            dispatch(fetchConfigurationSuccess(configuration));
            dispatch(connect(configuration));
            dispatch(
                notifySuccess({
                    message: 'configuration loaded',
                    ttl: 2000,
                }),
            );
            dispatch(setDashboards(configuration.dashboards));
            dispatch(play());
        })
        .catch((err: any) => {
            dispatch(
                notifyError({
                    message: `An error occurred while fetching configuration: ${err.message}`,
                    ttl: -1,
                }),
            );
            dispatch(fetchConfigurationFailure(err.message));
        });
};
