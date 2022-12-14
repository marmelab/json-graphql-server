import update from './update';

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('returns undefined by default', () => {
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(update()(null, {})).toBeUndefined();
});

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('returns updated record when found', () => {
    const data = [{ id: 1, value: 'foo', bar: 'baz' }];
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(update(data)(null, { id: 1, value: 'bar' })).toEqual({
        id: 1,
        value: 'bar',
        bar: 'baz',
    });
});

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('returns undefined when not found', () => {
    const data = [
        { id: 1, value: 'foo' },
        { id: 2, value: 'bar' },
    ];
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(update(data)(null, { id: 3 })).toBeUndefined();
});

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('updates record when found', () => {
    const data = [{ id: 1, value: 'foo' }];
    // @ts-expect-error TS(2345): Argument of type '{ id: number; value: string; }[]... Remove this comment to see the full error message
    update(data)(null, { id: 1, value: 'bar', bar: 'baz' });
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(data).toEqual([{ id: 1, value: 'bar', bar: 'baz' }]);
});

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('updates record with string id', () => {
    const data = [{ id: 'abc', value: 'foo' }];
    // @ts-expect-error TS(2345): Argument of type '{ id: string; value: string; }[]... Remove this comment to see the full error message
    update(data)(null, { id: 'abc', value: 'bar', bar: 'baz' });
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(data).toEqual([{ id: 'abc', value: 'bar', bar: 'baz' }]);
});

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('removes property when setting the value to undefined', () => {
    const data = [{ id: 1, value: 'foo' }];
    // @ts-expect-error TS(2345): Argument of type '{ id: number; value: string; }[]... Remove this comment to see the full error message
    update(data)(null, { id: 1, value: undefined });
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(data).toEqual([{ id: 1 }]);
});

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test("doesn't confuse undefined id with the id 'undefined'", () => {
    const data = [{ value: 'foo' }];
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(
        // @ts-expect-error TS(2345): Argument of type '{ value: string; }[]' is not ass... Remove this comment to see the full error message
        update(data)(null, { id: 'undefined', value: 'bar', bar: 'baz' })
    ).toBeUndefined();
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(data).toEqual([{ value: 'foo' }]);
});
