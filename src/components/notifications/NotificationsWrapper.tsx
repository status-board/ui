/** @jsx jsx */
import { jsx } from '@emotion/core';
import { ReactElement, ReactNode } from 'react';

interface Props {
    children: ReactNode;
}

const css = {
    position: 'absolute' as 'absolute',
    zIndex: 100000,
    width: '25%',
    top: '8vmin',
    right: '2vmin',
};

const Wrapper = ({ children }: Props): ReactElement => <div css={css}>{children}</div>;

export default Wrapper;
