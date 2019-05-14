import React from 'react';
import { withTheme } from 'emotion-theming';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPlay,
    faArrowLeft,
    faArrowRight,
} from '@fortawesome/free-solid-svg-icons';

import Button from './Button';
import Container from './Container';
import Page from './Page';
import PlayButton from './PlayButton';
import Slash from './Slash';
import { Dashboard, Theme } from '../../types';

interface DashboardPlayerProps {
    dashboards: Dashboard[];
    currentDashboardIndex: number;
    isPlaying: boolean;
    play: () => void;
    pause: () => void;
    previous: () => void;
    next: () => void;
    theme: Theme;
}

function DashboardPlayer(props: DashboardPlayerProps) {
    const {
        dashboards,
        currentDashboardIndex,
        isPlaying,
        play,
        pause,
        previous,
        next,
        theme,
    } = props;

    const iconColor = theme.colors.icon;

    let icon;
    let handler;
    if (isPlaying) {
        icon = 'plus';
        handler = pause;
    } else {
        icon = 'plusSparks';
        handler = play;
    }

    return (
        <Container>
            <Button onClick={previous}>
                <FontAwesomeIcon icon={faArrowLeft} size="1x" color={iconColor} />
            </Button>
            <Page>{currentDashboardIndex + 1}</Page>
            <Slash>/</Slash>
            <Page>{dashboards.length}</Page>
            <PlayButton onClick={handler}>
                <FontAwesomeIcon icon={faPlay} size="1x" color={iconColor} />
                {/* <PlayIcon type={icon} size={32} isPlaying={isPlaying} color={iconColor}/> */}
            </PlayButton>
            <Button onClick={next}>
                <FontAwesomeIcon icon={faArrowRight} size="1x" color={iconColor} />
            </Button>
        </Container>
    );
}

export default withTheme(DashboardPlayer);
