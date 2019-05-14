import { Dashboards } from '../../types';

export const SET_DASHBOARDS = 'SET_DASHBOARDS';
export const SET_CURRENT_DASHBOARD = 'SET_CURRENT_DASHBOARD';
export const DASHBOARDS_PLAY = 'DASHBOARDS_PLAY';
export const DASHBOARDS_PAUSE = 'DASHBOARDS_PAUSE';

export interface SetCurrentDashboardAction {
    type: typeof SET_CURRENT_DASHBOARD;
    index: any;
}

export interface SetDashboardsAction {
    type: typeof SET_DASHBOARDS;
    dashboards: Dashboards;
}

export interface DashboardPlayAction {
    type: typeof DASHBOARDS_PLAY;
}

export interface DashboardPauseAction {
    type: typeof DASHBOARDS_PAUSE;
}

export type DashboardActionTypes =
    SetCurrentDashboardAction
    | SetDashboardsAction
    | DashboardPlayAction
    | DashboardPauseAction;
