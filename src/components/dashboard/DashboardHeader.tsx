import React from 'react';
import { withTheme } from 'emotion-theming';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DashboardTitle from './DashboardTitle';
import DashboardPlayer from './DashboardPlayer';
import TitleWrapper from './TitleWrapper';
import Toggle from './Toggle';
import { Dashboard, Theme } from '../../types';
import Header from './Header';

interface DashboardHeaderProps {
    settingsOpened: boolean;
    toggleSettings: () => void;
    dashboards: Dashboard[];
    currentDashboardIndex: number;
    isPlaying: boolean;
    play: () => void;
    pause: () => void;
    previous: () => void;
    next: () => void;
    theme: Theme;
}

function DashboardHeader(props: DashboardHeaderProps) {
    const {
        dashboards,
        currentDashboardIndex,
        isPlaying,
        play,
        pause,
        previous,
        next,
        toggleSettings,
        theme,
    } = props;

    let title = 'Status Board';
    if (dashboards.length) {
        const dashboard = dashboards[currentDashboardIndex];
        if (dashboard.title !== undefined) {
            // eslint-disable-next-line prefer-destructuring
            title = dashboard.title;
        }
    }

    return (
        <Header>
            <TitleWrapper>
                <DashboardTitle currentDashboardIndex={currentDashboardIndex} title={title} />
            </TitleWrapper>
            {dashboards.length && dashboards.length > 1 && (
                <DashboardPlayer
                    dashboards={dashboards}
                    currentDashboardIndex={currentDashboardIndex}
                    isPlaying={isPlaying}
                    play={play}
                    pause={pause}
                    previous={previous}
                    next={next}
                />
            )}
            <Toggle onClick={toggleSettings}>
                <FontAwesomeIcon icon={faBars} size="lg" color={theme.colors.icon} />
            </Toggle>
        </Header>
    );
}

export default withTheme(DashboardHeader);
