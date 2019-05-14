/** @jsx jsx */
import { KeyboardEvent, ReactElement, ReactNode } from 'react';
import { jsx } from '@emotion/core';

interface Props {
    children: ReactNode;
    onClick: () => void;
}

const css = {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    height: '100%',
    padding: '0 0.6vmin',
    marginLeft: '0.6vmin',
};

const PlayButton = ({ children, onClick }: Props): ReactElement => (
    <span
        css={css}
        onClick={(): void => onClick()}
        onKeyPress={(event: KeyboardEvent): void => {
            if (event.key === 'Enter') {
                onClick();
            }
        }}
        role="button"
        tabIndex={0}
    >
        {children}
    </span>
);

export default PlayButton;
