import reducer from './reducer';
import { API_SUBSCRIBE, API_UNSUBSCRIBE, API_DATA } from './types';

it('should return the initial state', () => {
    expect(reducer(undefined, {}))
        .toEqual(
            {
                subscriptions: {},
                data: {},
                errors: {},
            },
        );
});

it('should handle API_SUBSCRIBE', () => {
    const state = reducer(undefined, {
        type: API_SUBSCRIBE,
        subscription: { id: 'yay' },
    });

    expect(state)
        .toEqual({
            subscriptions: {
                yay: {
                    id: 'yay',
                    hasSubscribed: false,
                },
            },
            data: {},
            errors: {},
        });
});

it('should handle API_DATA with array based data', () => {
    const data = ['a', 'b', 'c'];
    const state = reducer(undefined, {
        type: API_DATA,
        id: 'yay',
        data,
    });
    expect(state)
        .toEqual(
            {
                subscriptions: {},
                data: {
                    yay: data,
                },
                errors: {},
            },
        );
});

it('should handle API_DATA with string based data', () => {
    const data = 'incoming data';
    const state = reducer(undefined, {
        type: API_DATA,
        id: 'yay',
        data,
    });
    expect(state)
        .toEqual(
            {
                subscriptions: {},
                data: {
                    yay: data,
                },
                errors: {},
            },
        );
});

it('should handle API_DATA with number based data', () => {
    const data = 132;
    const state = reducer(undefined, {
        type: API_DATA,
        id: 'yay',
        data,
    });
    expect(state)
        .toEqual(
            {
                subscriptions: {},
                data: {
                    yay: data,
                },
                errors: {},
            },
        );
});

it('should handle API_DATA with object based data', () => {
    const data = {
        test: true,
        count: 12.3,
        labels: ['test', 'object'],
    };
    const state = reducer(undefined, {
        type: API_DATA,
        id: 'yay',
        data,
    });
    expect(state)
        .toEqual(
            {
                subscriptions: {},
                data: {
                    yay: data,
                },
                errors: {},
            },
        );
});

// it('should handle API_UNSUBSCRIBE', () => {
//     const state = reducer(
//         new Map({
//             subscriptions: new Map({
//                 yay: 'exists',
//             }),
//             data: new Map({}),
//             errors: new Map({}),
//         }),
//         {
//             type: API_UNSUBSCRIBE,
//             id: 'yay',
//         },
//     );
//     expect(state)
//         .toEqual(
//             new Map({
//                 subscriptions: new Map({}),
//                 data: new Map({}),
//                 errors: new Map({}),
//             }),
//         );
// });
