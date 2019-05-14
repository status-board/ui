/** @jsx jsx */
import { jsx } from '@emotion/core';
import { ReactElement, ReactNode } from 'react';
import { withTheme } from 'emotion-theming';
import { Theme } from '@status-board/theme-manager/lib/types';

interface Props {
    children: ReactNode;
    theme: Theme;
}

const css = {
    ...((props: Props) => ({
        fontSize: props.theme.dashboard.player.slash.fontSize,
        color: props.theme.dashboard.player.slash.color,
        margin: props.theme.dashboard.player.slash.margin,
    })),
};

const Slash = ({ children }: Props): ReactElement => <div css={css}>{children}</div>;

export default withTheme(Slash);
