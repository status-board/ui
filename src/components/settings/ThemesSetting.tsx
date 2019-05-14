import React, { Component } from 'react';
import { withTheme } from 'styled-components';
import {
    SlidersIcon,
    Widget,
    WidgetBody,
    WidgetHeader,
    WidgetListItem,
} from '@status-board/components';

import { Theme, Themes } from '../../types';

interface ThemeSettingProps {
    themes: Themes;
    theme: Theme;
    currentTheme: string;
    setTheme: (theme: string) => void;
}

class ThemeSetting extends Component<ThemeSettingProps> {
    public shouldComponentUpdate(nextProps: any) {
        const { currentTheme } = this.props;
        return currentTheme !== nextProps.currentTheme;
    }

    public render() {
        const {
            themes,
            currentTheme,
            setTheme,
        } = this.props;

        const themeIds = Object.keys(themes);

        return (
            <Widget>
                <WidgetHeader title="Themes" count={themeIds.length} icon={SlidersIcon} />
                <WidgetBody disablePadding>
                    {themeIds.map((t: string) => {
                        let icon = 'cross';
                        if (t === currentTheme) {
                            icon = 'check';
                        }

                        return (
                            <WidgetListItem
                                align="right"
                                key={t}
                                onClick={() => {
                                    setTheme(t);
                                }}
                                title={t}
                                style={{ cursor: 'pointer' }}
                                pre={icon}
                            />
                        );
                    })}
                </WidgetBody>
            </Widget>
        );
    }
}

export default withTheme(ThemeSetting);
