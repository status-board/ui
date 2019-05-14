import { THEME_SET } from './types';

// eslint-disable-next-line import/prefer-default-export
export const setTheme = (theme: string) => ({
    type: THEME_SET,
    theme,
});
