import React from 'react';
import { Global } from '@emotion/core';

const styles = {
    'html, body': {
        margin: 0,
        height: '100%',
        width: '100%',
        overflow: 'hidden',
        '-webkit-font-smoothing': 'antialiased',
        '-moz-osx-font-smoothing': 'grayscale',
    },
    '*, *:before, *:after': {
        'box-sizing': 'border-box',
    },
    a: {
        color: 'inherit',
        'text-decoration': 'none',
    },
    'a:hover': {
        'text-decoration': 'underline',
    },
    img: {
        'max-width': '100%',
        'max-height': '100%',
    },
    svg: {
        display: 'block',
    },
};

const GlobalStyle = () => <Global styles={styles} />;

export default GlobalStyle;
