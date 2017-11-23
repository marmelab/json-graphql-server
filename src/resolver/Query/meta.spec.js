import meta from './meta';

const data = [
    { id: 1, value: 1 },
    { id: 2, value: 1 },
    { id: 3, value: 1 },
    { id: 4, value: 2 },
];

const mixedTypes = [
    { id: 1, value: 1 },
    { id: 2, value: '1' },
    { id: 3, value: 1.5 },
    { id: 4, value: '2.5' },
];

test('without a given attr, it should only count items', () =>
    expect(meta(data)(null, {})).toEqual({
        avg: undefined,
        sum: undefined,
        count: 4,
    }));

test('given an attr, it should calculate avg and sum', () =>
    expect(meta(data)(null, { attr: 'value' })).toEqual({
        avg: 1.25,
        sum: 5,
        count: 4,
    }));

test('given mixed value types, it should convert to number', () =>
    expect(meta(mixedTypes)(null, { attr: 'value' })).toEqual({
        avg: 1.5,
        sum: 6,
        count: 4,
    }));
