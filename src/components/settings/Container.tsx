/** @jsx jsx */
import { CSSProperties, ReactElement } from 'react';
import { jsx } from '@emotion/core';

interface Props {
    children: ReactElement;
    style: CSSProperties;
}

const style = {
    position: 'absolute' as 'absolute',
    zIndex: 100,
    top: '6vmin',
    right: 0,
    width: ' 33%',
    bottom: '50%',
    padding: '2vmin 2vmin 0 0',
    ...((props: Props) => ({ ...props.style })),
};

const Container = ({ children }: Props): ReactElement => <div css={style}>{children}</div>;

export default Container;
