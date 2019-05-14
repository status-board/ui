import vm from 'vm';
import isPlainObject from './is-plain-object';

describe('isPlainObject', () => {
    it('returns true only if plain object', () => {
        class Test {
            private prop: number;

            public constructor() {
                this.prop = 1;
            }
        }

        const sandbox = { fromAnotherRealm: false };
        vm.runInNewContext('fromAnotherRealm = {}', sandbox);

        expect(isPlainObject(sandbox.fromAnotherRealm)).toBe(true);
        expect(isPlainObject(new Test())).toBe(false);
        expect(isPlainObject(new Date())).toBe(false);
        expect(isPlainObject([1, 2, 3])).toBe(false);
        expect(isPlainObject(null)).toBe(false);
        expect(isPlainObject(undefined)).toBe(false);
        expect(isPlainObject({ x: 1, y: 2 })).toBe(true);
    });
});
