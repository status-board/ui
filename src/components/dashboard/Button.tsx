/** @jsx jsx */
import { jsx } from '@emotion/core';
import {
    KeyboardEvent,
    ReactElement,
    ReactNode,
} from 'react';

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
};

const Button = ({ children, onClick }: Props): ReactElement => (
    <span
        css={css}
        onClick={() => onClick()}
        onKeyPress={(event: KeyboardEvent): void => {
            if (event.key === 'Enter') {
                onClick();
            }
        }}
        role="button"
        tabIndex={-3}

    >
        {children}
    </span>
);

export default Button;
