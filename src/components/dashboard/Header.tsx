/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Theme } from '@status-board/theme-manager/lib/types';
import { withTheme } from 'emotion-theming';
import { ReactElement, ReactNode } from 'react';

interface Props {
    children: ReactNode;
    theme: Theme;
}

const css = {
    position: 'absolute' as 'absolute',
    zIndex: 200,
    top: 0,
    left: 0,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    overflow: 'hidden',
    ...((props: Props) => ({
        height: props.theme.dashboard.header.height,
        padding: props.theme.dashboard.header.padding,
        background: props.theme.dashboard.header.background,
        color: props.theme.dashboard.header.color,
        boxShadow: props.theme.dashboard.header.boxShadow,
    })),
};

const Header = ({ children }: Props): ReactElement => <header css={css}>{children}</header>;

export default withTheme(Header);
