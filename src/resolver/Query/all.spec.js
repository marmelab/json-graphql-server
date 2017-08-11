import all from './all';

const data = [
    { id: 1, title: 'Lorem Ipsum', user_id: 123, views: 254 },
    { id: 2, title: 'Ut enim ad minim', user_id: 456, views: 65 },
    { id: 3, title: 'Sic Dolor amet', user_id: 123, views: 76 },
];

test('returns empty array on empty datastore', () =>
    expect(all()(null, {})).toEqual([]));

test('returns all entities by default', () =>
    expect(all(data)(null, {})).toEqual([
        { id: 1, title: 'Lorem Ipsum', user_id: 123, views: 254 },
        { id: 2, title: 'Ut enim ad minim', user_id: 456, views: 65 },
        { id: 3, title: 'Sic Dolor amet', user_id: 123, views: 76 },
    ]));

describe('pagination', () => {
    test('does not paginate when page is not set', () =>
        expect(all(data)(null, { perPage: 1 })).toEqual([
            { id: 1, title: 'Lorem Ipsum', user_id: 123, views: 254 },
            { id: 2, title: 'Ut enim ad minim', user_id: 456, views: 65 },
            { id: 3, title: 'Sic Dolor amet', user_id: 123, views: 76 },
        ]));

    test('uses page to set page number', () => {
        expect(all(data)(null, { page: 0 })).toEqual([
            { id: 1, title: 'Lorem Ipsum', user_id: 123, views: 254 },
            { id: 2, title: 'Ut enim ad minim', user_id: 456, views: 65 },
            { id: 3, title: 'Sic Dolor amet', user_id: 123, views: 76 },
        ]);
        expect(all(data)(null, { page: 1 })).toEqual([]);
    });

    test('uses perPage to set number of results per page', () => {
        expect(all(data)(null, { page: 0, perPage: 1 })).toEqual([
            { id: 1, title: 'Lorem Ipsum', user_id: 123, views: 254 },
        ]);
        expect(all(data)(null, { page: 1, perPage: 1 })).toEqual([
            { id: 2, title: 'Ut enim ad minim', user_id: 456, views: 65 },
        ]);
        expect(all(data)(null, { page: 2, perPage: 1 })).toEqual([
            { id: 3, title: 'Sic Dolor amet', user_id: 123, views: 76 },
        ]);
        expect(all(data)(null, { page: 3, perPage: 1 })).toEqual([]);
        expect(all(data)(null, { page: 0, perPage: 2 })).toEqual([
            { id: 1, title: 'Lorem Ipsum', user_id: 123, views: 254 },
            { id: 2, title: 'Ut enim ad minim', user_id: 456, views: 65 },
        ]);
        expect(all(data)(null, { page: 1, perPage: 2 })).toEqual([
            { id: 3, title: 'Sic Dolor amet', user_id: 123, views: 76 },
        ]);
        expect(all(data)(null, { page: 2, perPage: 2 })).toEqual([]);
    });
});

describe('sort', () => {
    test('sorts data using sortField for the field', () => {
        expect(all(data)(null, { sortField: 'views' })).toEqual([
            { id: 2, title: 'Ut enim ad minim', user_id: 456, views: 65 },
            { id: 3, title: 'Sic Dolor amet', user_id: 123, views: 76 },
            { id: 1, title: 'Lorem Ipsum', user_id: 123, views: 254 },
        ]);
        expect(all(data)(null, { sortField: 'title' })).toEqual([
            { id: 1, title: 'Lorem Ipsum', user_id: 123, views: 254 },
            { id: 3, title: 'Sic Dolor amet', user_id: 123, views: 76 },
            { id: 2, title: 'Ut enim ad minim', user_id: 456, views: 65 },
        ]);
    });
    test('sorts data using sortOrder for the sort direction', () => {
        expect(
            all(data)(null, { sortField: 'views', sortOrder: 'asc' }),
        ).toEqual([
            { id: 2, title: 'Ut enim ad minim', user_id: 456, views: 65 },
            { id: 3, title: 'Sic Dolor amet', user_id: 123, views: 76 },
            { id: 1, title: 'Lorem Ipsum', user_id: 123, views: 254 },
        ]);
        expect(
            all(data)(null, { sortField: 'views', sortOrder: 'desc' }),
        ).toEqual([
            { id: 1, title: 'Lorem Ipsum', user_id: 123, views: 254 },
            { id: 3, title: 'Sic Dolor amet', user_id: 123, views: 76 },
            { id: 2, title: 'Ut enim ad minim', user_id: 456, views: 65 },
        ]);
    });
});

describe('filter', () => {
    test('filters by string on all text fields using the q filter', () =>
        expect(all(data)(null, { filter: { q: 'Lorem' } })).toEqual([
            { id: 1, title: 'Lorem Ipsum', user_id: 123, views: 254 },
        ]));
    test('filters by string using the q filter in a case-insensitive way', () =>
        expect(all(data)(null, { filter: { q: 'lorem' } })).toEqual([
            { id: 1, title: 'Lorem Ipsum', user_id: 123, views: 254 },
        ]));
    test('filters by value on each field using the related filter', () => {
        expect(all(data)(null, { filter: { id: 2 } })).toEqual([
            { id: 2, title: 'Ut enim ad minim', user_id: 456, views: 65 },
        ]);
        expect(
            all(data)(null, { filter: { title: 'Sic Dolor amet' } }),
        ).toEqual([
            { id: 3, title: 'Sic Dolor amet', user_id: 123, views: 76 },
        ]);
        expect(all(data)(null, { filter: { views: 65 } })).toEqual([
            { id: 2, title: 'Ut enim ad minim', user_id: 456, views: 65 },
        ]);
        expect(all(data)(null, { filter: { user_id: 456 } })).toEqual([
            { id: 2, title: 'Ut enim ad minim', user_id: 456, views: 65 },
        ]);
    });
    test('filters by value range on each integer field using the related filters', () => {
        expect(all(data)(null, { filter: { views_lt: 76 } })).toEqual([
            { id: 2, title: 'Ut enim ad minim', user_id: 456, views: 65 },
        ]);
        expect(all(data)(null, { filter: { views_lte: 76 } })).toEqual([
            { id: 2, title: 'Ut enim ad minim', user_id: 456, views: 65 },
            { id: 3, title: 'Sic Dolor amet', user_id: 123, views: 76 },
        ]);
        expect(all(data)(null, { filter: { views_gt: 76 } })).toEqual([
            { id: 1, title: 'Lorem Ipsum', user_id: 123, views: 254 },
        ]);
        expect(all(data)(null, { filter: { views_gte: 76 } })).toEqual([
            { id: 1, title: 'Lorem Ipsum', user_id: 123, views: 254 },
            { id: 3, title: 'Sic Dolor amet', user_id: 123, views: 76 },
        ]);
    });
});
