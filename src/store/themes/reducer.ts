import { THEME_SET } from './types';

export default function themes(
    state = {
        current: null,
        themes: {},
    },
    action: any,
) {
    switch (action.type) {
        case THEME_SET:
            return {
                ...state,
                current: action.theme,
            };

        default:
            return state;
    }
}
