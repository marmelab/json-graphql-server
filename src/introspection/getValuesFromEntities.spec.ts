import getValuesFromEntities from './getValuesFromEntities';

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('does not take empty values into account', () => {
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(getValuesFromEntities([{ foo: null }, {}, { foo: 'bar' }])).toEqual({
        foo: ['bar'],
    });
});
// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('returns an array of values for every field', () => {
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(
        getValuesFromEntities([
            { id: 1, foo: 'bar' },
            { id: 2, foo: 'baz' },
        ])
    ).toEqual({
        id: [1, 2],
        foo: ['bar', 'baz'],
    });
});
// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('does not ignore duplicate values', () => {
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(getValuesFromEntities([{ foo: 'bar' }, { foo: 'bar' }])).toEqual({
        foo: ['bar', 'bar'],
    });
});
// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('can handle sparse fieldsets', () => {
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(
        getValuesFromEntities([
            { id: 1, foo: 'foo1' },
            { id: 2, foo: 'foo2', bar: 'bar1' },
            { id: 3, bar: 'bar2' },
        ])
    ).toEqual({
        id: [1, 2, 3],
        foo: ['foo1', 'foo2'],
        bar: ['bar1', 'bar2'],
    });
});
