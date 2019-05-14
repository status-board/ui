import React, { ReactNode } from 'react';
import { ThemeProvider } from 'emotion-theming';
import { Themes } from '../types';

interface ThemeProviderProps {
    themes: Themes;
    current: string;
    children: ReactNode;
}

export default function (props: ThemeProviderProps): React.ReactElement {
    const { themes, current, children } = props;
    let theme = {};
    if (Object.prototype.hasOwnProperty.call(themes, current)) {
        theme = themes[current];
    }

    return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
