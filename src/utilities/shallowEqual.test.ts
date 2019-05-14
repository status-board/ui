import shallowEqual from './shallowEqual';

describe('shallowEqual', () => {
    it('should shallow compare', () => {
        const base = { a: 1, b: 2 };

        expect(shallowEqual(base, { a: 1, b: 2 })).toEqual(true);
        expect(shallowEqual(base, { a: 1, b: 3 })).toEqual(false);
        expect(shallowEqual(base, { a: 1, b: 2, c: 3 })).toEqual(false);
        expect(shallowEqual(base, { a: 1 })).toEqual(false);
    });

    it('should not support deep comparision', () => {
        const base = { a: { b: 2 } };

        expect(shallowEqual(base, { a: { b: 2 } })).toEqual(false);
    });

    test('that null is to equal null', () => {
        expect(shallowEqual(null, null)).toEqual(true);
    });

    test('that null does not equal a object', () => {
        expect(shallowEqual(null, {})).toEqual(false);
        expect(shallowEqual({}, null)).toEqual(false);
    });
});
