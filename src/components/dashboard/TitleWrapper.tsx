/** @jsx jsx */
import { ReactElement, ReactNode } from 'react';
import { jsx } from '@emotion/core';
import { Theme } from '@status-board/theme-manager/lib/types';
import { typography } from '@status-board/theme-manager';
import { withTheme } from 'emotion-theming';

interface Props {
    children: ReactNode;
    theme: Theme;
}

const css = {
    flexGrow: 1,
    marginRight: '4vmin',
    height: '6vmin',
    ...((props: Props) => typography(props.theme, 'display')),
};

const TitleWrapper = ({ children }: Props): ReactElement => <div css={css}>{children}</div>;

export default withTheme(TitleWrapper);
