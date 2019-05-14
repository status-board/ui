import { ComponentClass, FunctionComponent } from 'react';
import { Themes } from '@status-board/theme-manager/lib/types';

import { ApiState } from '../store/api/types';

export interface Configuration {
    env?: string;
    host?: string;
    port?: number;
    theme?: string;
    api?: {
        [key: string]: {
            [key: string]: any;
        };
    };
    reconnectionAttempts?: number;
    rotationDuration?: number;
    apisPollInterval?: number;
    useWssConnection?: boolean;
    wsPort?: string;
    dashboards: Dashboard[];
}

export interface Config {
    isLoading: boolean;
    configuration: Configuration;
}

export interface Widget {
    extension: string;
    widget: string;
    type: string;
    owner?: string;
    user?: string;
    repository?: string;
    subscriptionId?: string;
    columns: number;
    rows: number;
    x: number;
    y: number;
}

export interface Dashboard {
    title: string;
    columns: number;
    rows: number;
    widgets: Widget[];
}


export interface Dashboards {
    dashboards: Dashboard[];
    current: number;
    isPlaying: boolean;
}

export interface Notification {
    id?: string;
    ttl?: number;
    status?: string;
    message?: string;
    component?: FunctionComponent<any> | ComponentClass<any> | string;
    props?: {
        reconnectionAttempts?: number;
        retryCount?: number;
        status: string;
    };
}

export interface Notifications {
    items: Notification[];
}

export interface WebSocket {
    connected: boolean;
    connecting: boolean;
}

export interface TypographyDefaultDefault {
    fontFamily: string;
    fontSize: string;
    fontWeight: number;
    lineHeight: string;
}

export interface TypographyDefaultStrong {
    fontWeight: number;
}

export interface TypographyDefaultSmall {
    fontSize: string;
}

export interface TypographyDisplayDefault {
    fontFamily: string;
    fontSize: string;
    fontWeight: number;
}

export interface TypographyMonoDefault {
    fontFamily: string;
    fontSize: string;
    lineHeight: string;
}

export interface Typography {
    [key: string]: {
        [key: string]: {
            fontFamily?: string;
            fontSize?: string;
            fontWeight?: number;
            lineHeight?: string;
        };
    };

    default: {
        default: TypographyDefaultDefault;
        strong: TypographyDefaultStrong;
        small: TypographyDefaultSmall;
    };
    display: {
        default: TypographyDisplayDefault;
    };
    mono: {
        default: TypographyMonoDefault;
    };
}

export interface ThemesSettings {
    themes: Themes;
    current: string;
}

export interface RootState {
    api: ApiState;
    configuration: Config;
    dashboards: Dashboards;
    notifications: Notifications;
    ws: WebSocket;
    themes: ThemesSettings;
}
