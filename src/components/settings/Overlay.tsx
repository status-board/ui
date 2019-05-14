/** @jsx jsx */
import { jsx } from '@emotion/core';
import { KeyboardEvent, ReactElement } from 'react';

interface Props {
    onClick: () => void;
}

const style = {
    position: 'absolute' as 'absolute',
    top: '6vmin',
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
};

const Overlay = ({ onClick }: Props): ReactElement => (
    <div
        css={style}
        onClick={() => onClick()}
        onKeyPress={(event: KeyboardEvent): void => {
            if (event.key === 'Enter') {
                onClick();
            }
        }}
        role="button"
        tabIndex={-2}
    />
);

export default Overlay;
