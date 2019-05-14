/** @jsx jsx */
import { jsx } from '@emotion/core';
import { KeyboardEvent, ReactElement, ReactNode } from 'react';

interface Props {
    children: ReactNode;
    onClick: () => void;
}

const css = {
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '2vmin',
};

const Toggle = ({ children, onClick }: Props): ReactElement => (
    <div
        css={css}
        onClick={(): void => onClick()}
        onKeyPress={(event: KeyboardEvent): void => {
            if (event.key === 'Enter') {
                onClick();
            }
        }}
        role="button"
        tabIndex={-1}
    >
        {children}
    </div>
);

export default Toggle;
