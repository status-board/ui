import {
    DASHBOARDS_PAUSE,
    DASHBOARDS_PLAY,
    SET_CURRENT_DASHBOARD,
    SET_DASHBOARDS,
} from './types';

export default function dashboards(
    state = {
        dashboards: [],
        current: 0,
        isPlaying: false,
    },
    action: any,
) {
    switch (action.type) {
        case SET_DASHBOARDS:
            return {
                ...state,
                dashboards: action.dashboards,
            };

        case SET_CURRENT_DASHBOARD:
            return {
                ...state,
                current: action.index,
            };

        case DASHBOARDS_PLAY:
            return {
                ...state,
                isPlaying: true,
            };

        case DASHBOARDS_PAUSE:
            return {
                ...state,
                isPlaying: false,
            };

        default:
            return state;
    }
}
