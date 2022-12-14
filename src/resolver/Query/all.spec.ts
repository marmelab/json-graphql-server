import all from './all';

const data = [
    { id: 1, title: 'Lorem Ipsum', user_id: 123, views: 254 },
    { id: 2, title: 'Ut enim ad minim', user_id: 456, views: 65 },
    { id: 3, title: 'Sic Dolor amet', user_id: 123, views: 76 },
];

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('returns empty array on empty datastore', () =>
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(all()(null, {})).toEqual([]));

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('returns all entities by default', () =>
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(all(data)(null, {})).toEqual([
        { id: 1, title: 'Lorem Ipsum', user_id: 123, views: 254 },
        { id: 2, title: 'Ut enim ad minim', user_id: 456, views: 65 },
        { id: 3, title: 'Sic Dolor amet', user_id: 123, views: 76 },
    ]));

// @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe('pagination', () => {
    // @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
    test('does not paginate when page is not set', () =>
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(all(data)(null, { perPage: 1 })).toEqual([
            { id: 1, title: 'Lorem Ipsum', user_id: 123, views: 254 },
            { id: 2, title: 'Ut enim ad minim', user_id: 456, views: 65 },
            { id: 3, title: 'Sic Dolor amet', user_id: 123, views: 76 },
        ]));

    // @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
    test('uses page to set page number', () => {
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(all(data)(null, { page: 0 })).toEqual([
            { id: 1, title: 'Lorem Ipsum', user_id: 123, views: 254 },
            { id: 2, title: 'Ut enim ad minim', user_id: 456, views: 65 },
            { id: 3, title: 'Sic Dolor amet', user_id: 123, views: 76 },
        ]);
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(all(data)(null, { page: 1 })).toEqual([]);
    });

    // @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
    test('uses perPage to set number of results per page', () => {
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(all(data)(null, { page: 0, perPage: 1 })).toEqual([
            { id: 1, title: 'Lorem Ipsum', user_id: 123, views: 254 },
        ]);
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(all(data)(null, { page: 1, perPage: 1 })).toEqual([
            { id: 2, title: 'Ut enim ad minim', user_id: 456, views: 65 },
        ]);
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(all(data)(null, { page: 2, perPage: 1 })).toEqual([
            { id: 3, title: 'Sic Dolor amet', user_id: 123, views: 76 },
        ]);
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(all(data)(null, { page: 3, perPage: 1 })).toEqual([]);
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(all(data)(null, { page: 0, perPage: 2 })).toEqual([
            { id: 1, title: 'Lorem Ipsum', user_id: 123, views: 254 },
            { id: 2, title: 'Ut enim ad minim', user_id: 456, views: 65 },
        ]);
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(all(data)(null, { page: 1, perPage: 2 })).toEqual([
            { id: 3, title: 'Sic Dolor amet', user_id: 123, views: 76 },
        ]);
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(all(data)(null, { page: 2, perPage: 2 })).toEqual([]);
    });
});

// @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe('sort', () => {
    // @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
    test('sorts data using sortField for the field', () => {
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(all(data)(null, { sortField: 'views' })).toEqual([
            { id: 2, title: 'Ut enim ad minim', user_id: 456, views: 65 },
            { id: 3, title: 'Sic Dolor amet', user_id: 123, views: 76 },
            { id: 1, title: 'Lorem Ipsum', user_id: 123, views: 254 },
        ]);
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(all(data)(null, { sortField: 'title' })).toEqual([
            { id: 1, title: 'Lorem Ipsum', user_id: 123, views: 254 },
            { id: 3, title: 'Sic Dolor amet', user_id: 123, views: 76 },
            { id: 2, title: 'Ut enim ad minim', user_id: 456, views: 65 },
        ]);
    });
    // @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
    test('sorts data using sortOrder for the sort direction', () => {
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(
            // @ts-expect-error TS(2345): Argument of type '{ id: number; title: string; use... Remove this comment to see the full error message
            all(data)(null, { sortField: 'views', sortOrder: 'asc' })
        ).toEqual([
            { id: 2, title: 'Ut enim ad minim', user_id: 456, views: 65 },
            { id: 3, title: 'Sic Dolor amet', user_id: 123, views: 76 },
            { id: 1, title: 'Lorem Ipsum', user_id: 123, views: 254 },
        ]);
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(
            // @ts-expect-error TS(2345): Argument of type '{ id: number; title: string; use... Remove this comment to see the full error message
            all(data)(null, { sortField: 'views', sortOrder: 'desc' })
        ).toEqual([
            { id: 1, title: 'Lorem Ipsum', user_id: 123, views: 254 },
            { id: 3, title: 'Sic Dolor amet', user_id: 123, views: 76 },
            { id: 2, title: 'Ut enim ad minim', user_id: 456, views: 65 },
        ]);
    });
});
