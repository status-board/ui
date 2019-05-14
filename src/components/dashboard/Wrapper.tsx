/** @jsx jsx */
import { jsx } from '@emotion/core';
import { ReactElement, ReactNode } from 'react';
import { Theme } from '@status-board/theme-manager/lib/types';
import { withTheme } from 'emotion-theming';

interface Props {
    children: ReactNode;
    theme: Theme;
}

const css = {
    position: 'absolute' as 'absolute',
    right: 'calc(1.2vmin / 2)',
    bottom: 'calc(1.2vmin / 2)',
    left: 'calc(1.2vmin / 2)',
    ...((props: Props) => ({
        top: `calc(1.2vmin / 2 + ${props.theme.dashboard.header.height})`,
    })),
};

const Wrapper = ({ children }: Props): ReactElement => <div css={css}>{children}</div>;

export default withTheme(Wrapper);
