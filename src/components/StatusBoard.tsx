import React, { Component } from 'react';
import { ThemeManager } from '@status-board/theme-manager';

import Root from './Root';
import GlobalStyle from './GlobalStyle';
import WidgetsRegistry from '../WidgetsRegistry';
import Settings from './settings/Settings';
import Dashboard from './dashboard/Dashboard';
import DashboardHeader from './dashboard/DashboardHeader';
import Notifications from '../containers/NotificationsContainer';

import {
    Configuration,
    Dashboard as DashboardType,
    Themes,
} from '../types';


interface StatusBoardProps {
    isLoading: boolean;
    configuration: Configuration;
    dashboards: DashboardType[];
    currentDashboard: number;
    isPlaying: boolean;
    themes: Themes;
    currentTheme: string;

    fetchConfiguration: () => void;
    play: () => void;
    pause: () => void;
    previous: () => void;
    next: () => void;
    setTheme: (theme: string) => void;
}

interface StatusBoardState {
    settingsOpened: boolean;
}

export default class StatusBoard extends Component<StatusBoardProps, StatusBoardState> {
    public constructor(props: StatusBoardProps) {
        super(props);

        this.toggleSettings = this.toggleSettings.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);

        this.state = { settingsOpened: false };
    }

    public componentDidMount() {
        const { fetchConfiguration } = this.props;
        fetchConfiguration();

        document.addEventListener('keydown', this.onKeyDown);
    }

    public componentWillUnmount() {
        document.removeEventListener('keydown', this.onKeyDown);
    }

    // TODO: Remove disable ESLint.
    // eslint-disable-next-line consistent-return
    public onKeyDown({ code }: KeyboardEvent) {
        const {
            play,
            previous,
            pause,
            next,
            isPlaying,
        } = this.props;
        switch (code) {
            case 'ArrowRight': {
                next();
                play();
                break;
            }
            case 'ArrowLeft': {
                previous();
                play();
                break;
            }
            case 'Space':
                return isPlaying ? pause() : play();
            default:
        }
    }

    public toggleSettings() {
        const { settingsOpened } = this.state;
        this.setState({ settingsOpened: !settingsOpened });
    }


    public render() {
        const {
            isLoading,
            dashboards,
            currentDashboard,
            isPlaying,
            play,
            pause,
            previous,
            next,
            themes,
            currentTheme,
            setTheme,
        } = this.props;

        const { settingsOpened } = this.state;

        let content = <div>loading</div>;
        if (!isLoading && dashboards.length > 0) {
            content = (
                <Dashboard
                    dashboard={dashboards[currentDashboard]}
                    dashboardIndex={currentDashboard}
                    registry={WidgetsRegistry}
                />
            );
        }

        return (
            <Root>
                <GlobalStyle />
                <DashboardHeader
                    settingsOpened={settingsOpened}
                    toggleSettings={this.toggleSettings}
                    dashboards={dashboards}
                    currentDashboardIndex={currentDashboard}
                    isPlaying={isPlaying}
                    play={play}
                    pause={pause}
                    previous={previous}
                    next={next}
                    theme={ThemeManager.get(currentTheme)}
                />
                {content}
                <Settings
                    themes={themes}
                    currentTheme={currentTheme}
                    setTheme={setTheme}
                    opened={settingsOpened}
                    close={this.toggleSettings}
                />
                <Notifications />
            </Root>
        );
    }
}
