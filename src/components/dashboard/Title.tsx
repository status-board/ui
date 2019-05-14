/** @jsx jsx */
import { jsx } from '@emotion/core';
import { withTheme } from 'emotion-theming';
import { CSSProperties, ReactElement, ReactNode } from 'react';
import { Theme } from '@status-board/theme-manager/lib/types';

interface Props {
    children: ReactNode;
    style: CSSProperties;
    theme: Theme;
}

const css = {
    height: '6vmin',
    position: 'absolute' as 'absolute',
    top: 0,
    left: 0,
    display: 'flex',
    alignItems: 'center',
    whiteSpace: 'pre' as 'pre',
    ...((props: Props) => ({
        fontFamily: props.theme.dashboard.header.title.fontFamily,
        fontSize: props.theme.dashboard.header.title.fontSize,
        textTransform: props.theme.dashboard.header.title.textTransform,
        color: props.theme.dashboard.header.title.color,
        ...props.style,
    })),
};

const Title = ({ children }: Props): ReactElement => <div css={css}>{children}</div>;

export default withTheme(Title);
