import applyFilters from './applyFilters';

const data = [
    {
        id: 1,
        title: 'Lorem Ipsum',
        user_id: 123,
        views: 254,
        tags: ['foo', 'bar'],
    },
    {
        id: 2,
        title: 'Ut enim ad minim',
        user_id: 456,
        views: 65,
        tags: ['foo'],
    },
    { id: 3, title: 'Sic Dolor amet', user_id: 123, views: 76, tags: [] },
];

test('returns empty array on empty datastore', () =>
    expect(applyFilters(undefined, {})).toEqual([]));

test('returns all entities by default', () =>
    expect(applyFilters(data, {})).toEqual([
        {
            id: 1,
            title: 'Lorem Ipsum',
            user_id: 123,
            views: 254,
            tags: ['foo', 'bar'],
        },
        {
            id: 2,
            title: 'Ut enim ad minim',
            user_id: 456,
            views: 65,
            tags: ['foo'],
        },
        { id: 3, title: 'Sic Dolor amet', user_id: 123, views: 76, tags: [] },
    ]));

test('filters by string on all text fields using the q filter', () =>
    expect(applyFilters(data, { q: 'Lorem' })).toEqual([
        {
            id: 1,
            title: 'Lorem Ipsum',
            user_id: 123,
            views: 254,
            tags: ['foo', 'bar'],
        },
    ]));

test('filters by string using the q filter in a case-insensitive way', () =>
    expect(applyFilters(data, { q: 'lorem' })).toEqual([
        {
            id: 1,
            title: 'Lorem Ipsum',
            user_id: 123,
            views: 254,
            tags: ['foo', 'bar'],
        },
    ]));

test('filters by value on each field using the related filter', () => {
    expect(applyFilters(data, { id: 2 })).toEqual([
        {
            id: 2,
            title: 'Ut enim ad minim',
            user_id: 456,
            views: 65,
            tags: ['foo'],
        },
    ]);
    expect(applyFilters(data, { title: 'Sic Dolor amet' })).toEqual([
        { id: 3, title: 'Sic Dolor amet', user_id: 123, views: 76, tags: [] },
    ]);
    expect(applyFilters(data, { views: 65 })).toEqual([
        {
            id: 2,
            title: 'Ut enim ad minim',
            user_id: 456,
            views: 65,
            tags: ['foo'],
        },
    ]);
    expect(applyFilters(data, { user_id: 456 })).toEqual([
        {
            id: 2,
            title: 'Ut enim ad minim',
            user_id: 456,
            views: 65,
            tags: ['foo'],
        },
    ]);
});

test('filters by not equals given fields', () => {
    expect(applyFilters(data, { id_neq: 2 })).toEqual([
        {
            id: 1,
            title: 'Lorem Ipsum',
            user_id: 123,
            views: 254,
            tags: ['foo', 'bar'],
        },
        { id: 3, title: 'Sic Dolor amet', user_id: 123, views: 76, tags: [] },
    ]);
});

test('filters by value range on each integer field using the related filters', () => {
    expect(applyFilters(data, { views_lt: 76 })).toEqual([
        {
            id: 2,
            title: 'Ut enim ad minim',
            user_id: 456,
            views: 65,
            tags: ['foo'],
        },
    ]);
    expect(applyFilters(data, { views_lte: 76 })).toEqual([
        {
            id: 2,
            title: 'Ut enim ad minim',
            user_id: 456,
            views: 65,
            tags: ['foo'],
        },
        { id: 3, title: 'Sic Dolor amet', user_id: 123, views: 76, tags: [] },
    ]);
    expect(applyFilters(data, { views_gt: 76 })).toEqual([
        {
            id: 1,
            title: 'Lorem Ipsum',
            user_id: 123,
            views: 254,
            tags: ['foo', 'bar'],
        },
    ]);
    expect(applyFilters(data, { views_gte: 76 })).toEqual([
        {
            id: 1,
            title: 'Lorem Ipsum',
            user_id: 123,
            views: 254,
            tags: ['foo', 'bar'],
        },
        { id: 3, title: 'Sic Dolor amet', user_id: 123, views: 76, tags: [] },
    ]);
});

test('should filter by id if filter contains an ids key', () => {
    expect(applyFilters(data, { ids: [2, 3] })).toEqual([
        {
            id: 2,
            title: 'Ut enim ad minim',
            user_id: 456,
            views: 65,
            tags: ['foo'],
        },
        { id: 3, title: 'Sic Dolor amet', user_id: 123, views: 76, tags: [] },
    ]);
});

test('should filter by value if filter contains an array for the key', () => {
    expect(
        applyFilters(data, { title: ['Ut enim ad minim', 'Sic Dolor amet'] })
    ).toEqual([
        {
            id: 2,
            title: 'Ut enim ad minim',
            user_id: 456,
            views: 65,
            tags: ['foo'],
        },
        { id: 3, title: 'Sic Dolor amet', user_id: 123, views: 76, tags: [] },
    ]);

    expect(applyFilters(data, { tags: ['foo'] })).toEqual([
        {
            id: 1,
            title: 'Lorem Ipsum',
            user_id: 123,
            views: 254,
            tags: ['foo', 'bar'],
        },
        {
            id: 2,
            title: 'Ut enim ad minim',
            user_id: 456,
            views: 65,
            tags: ['foo'],
        },
    ]);
});
