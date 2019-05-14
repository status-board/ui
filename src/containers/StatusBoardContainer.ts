import { Action } from 'redux';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

import StatusBoard from '../components/StatusBoard';
import {
    fetchConfiguration,
} from '../store/configuration/actions';
import {
    play,
    pause,
    previous,
    next,
} from '../store/dashboards/actions';
import {
    setTheme,
} from '../store/themes/actions';
import {
    RootState,
} from '../types';

const mapStateToProps = (state: RootState) => {
    const {
        configuration: { isLoading, configuration },
        dashboards: { dashboards, current, isPlaying },
        themes: { themes, current: currentTheme },
    } = state;

    return {
        isLoading,
        configuration,
        dashboards,
        currentDashboard: current,
        isPlaying,
        themes,
        currentTheme,
    };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<RootState, null, Action>) => ({
    fetchConfiguration: () => {
        dispatch(fetchConfiguration());
    },
    play: () => {
        dispatch(play());
    },
    pause: () => {
        dispatch(pause());
    },
    previous: () => {
        dispatch(pause());
        dispatch(previous());
    },
    next: () => {
        dispatch(pause());
        dispatch(next());
    },
    setTheme: (theme: string) => {
        dispatch(setTheme(theme));
    },
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(StatusBoard);
