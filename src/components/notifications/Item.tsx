/** @jsx jsx */
import { ReactElement, ReactNode } from 'react';
import { Theme } from '@status-board/theme-manager/lib/types';
import { typography } from '@status-board/theme-manager';
import { jsx } from '@emotion/core';
import { withTheme } from 'emotion-theming';

interface Props {
    children: ReactNode;
    theme: Theme;
}

const css = {
    position: 'relative' as 'relative',
    marginBottom: '1.4vmin',
    ...((props: Props) => ({
        padding: props.theme.notifications.item.padding,
        background: props.theme.notifications.item.background,
        color: props.theme.notifications.item.color,
        ...typography(props.theme),
    })),
};

const Item = ({ children }: Props): ReactElement => <div css={css}>{children}</div>;

export default withTheme(Item);
