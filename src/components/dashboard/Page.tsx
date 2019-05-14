/** @jsx jsx */
import { jsx } from '@emotion/core';
import { ReactElement, ReactNode } from 'react';

interface Props {
    children: ReactNode;
}

const css = {
    display: 'inline-block',
    width: '2vmin',
    textAlign: 'center' as 'center',
};

const Page = ({ children }: Props): ReactElement => <span css={css}>{children}</span>;

export default Page;
