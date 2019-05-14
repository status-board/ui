import React from 'react';
import { spring, TransitionMotion } from 'react-motion';

import ThemeSetting from './ThemesSetting';
import Overlay from './Overlay';
import Container from './Container';
import { Themes } from '../../types';

const willEnter = () => ({ y: -100, opacity: 0 });
const willLeave = () => ({
    y: spring(-100, { stiffness: 150, damping: 15, precision: 0.1 }),
    opacity: spring(0, { stiffness: 150, damping: 15, precision: 0.01 }),
});

interface Props {
    themes: Themes;
    currentTheme: string;
    setTheme: (theme: string) => void;
    opened: boolean;
    close: () => void;
}

export default function Settings(props: Props) {
    const {
        close,
        currentTheme,
        opened,
        setTheme,
        themes,
    } = props;

    const settings = [];
    if (opened) {
        settings.push({ key: 'settings' });
    }

    return (
        <div>
            {opened && <Overlay onClick={close} />}
            <TransitionMotion
                willEnter={willEnter}
                willLeave={willLeave}
                styles={settings.map(item => ({
                    key: item.key,
                    style: {
                        y: spring(0, {
                            stiffness: 150,
                            damping: 11,
                            precision: 0.1,
                        }),
                        opacity: spring(1, {
                            stiffness: 150,
                            damping: 11,
                            precision: 0.01,
                        }),
                    },
                }))}
            >
                {styles => (
                    <div>
                        {styles.map(({ key, style }) => (
                            <Container
                                key={key}
                                style={{
                                    opacity: style.opacity,
                                    transform: `translate(0,${style.y}px)`,
                                }}
                            >
                                <ThemeSetting
                                    themes={themes}
                                    currentTheme={currentTheme}
                                    setTheme={setTheme}
                                />
                            </Container>
                        ))}
                    </div>
                )}
            </TransitionMotion>
        </div>
    );
}
