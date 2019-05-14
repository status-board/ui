/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Theme } from '@status-board/theme-manager/lib/types';
import { typography } from '@status-board/theme-manager';
import { withTheme } from 'emotion-theming';
import { ReactElement, ReactNode } from 'react';

interface Props {
    children: ReactNode;
    theme: Theme;
}

const css = {
    marginRight: '6vmin',
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    ...((props: Props) => ({ ...typography(props.theme) })),
};

const Container = ({ children }: Props): ReactElement => <div css={css}>{children}</div>;

export default withTheme(Container);
