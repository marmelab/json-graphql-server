import meta from './meta';

const data = [
    { id: 1, title: 'Lorem Ipsum', user_id: 123, views: 1 },
    { id: 2, title: 'Ut enim ad minim', user_id: 456, views: 1 },
    { id: 3, title: 'Sic Dolor amet', user_id: 123, views: 1 },
    { id: 4, title: 'Sic Dolor amet', user_id: 123, views: 2 },
];

test('without a given attr, it should only count items', () =>
    expect(meta(data)(null, {})).toEqual({
        avg: undefined,
        sum: undefined,
        count: 4,
    }));

test('given an attr, it should calculate avg and sum', () =>
    expect(meta(data)(null, { attr: 'views' })).toEqual({
        avg: 1.25,
        sum: 5,
        count: 4,
    }));
