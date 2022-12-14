import remove from './remove';

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('returns undefined by default', () => {
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(remove()(null, {})).toBeUndefined();
});

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('returns removed record when found', () => {
    const data = [
        { id: 1, value: 'foo' },
        { id: 2, value: 'bar' },
    ];
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(remove(data)(null, { id: 1 })).toEqual({ id: 1, value: 'foo' });
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(data).toEqual([{ id: 2, value: 'bar' }]);
});

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('returns undefined when not found', () => {
    const data = [
        { id: 1, value: 'foo' },
        { id: 2, value: 'bar' },
    ];
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(remove(data)(null, { id: 3 })).toBeUndefined();
});

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('leaves data unmodified when not found', () => {
    const data = [
        { id: 1, value: 'foo' },
        { id: 2, value: 'bar' },
    ];
    const originalData = [...data];
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(remove(data)(null, { id: 3 })).toBeUndefined();
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(data).toEqual(originalData);
});

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('removes record when found', () => {
    const data = [
        { id: 1, value: 'foo' },
        { id: 2, value: 'bar' },
    ];
    // @ts-expect-error TS(2345): Argument of type '{ id: number; value: string; }[]... Remove this comment to see the full error message
    remove(data)(null, { id: 1 });
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(data).toEqual([{ id: 2, value: 'bar' }]);
});

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('removes with string data id', () => {
    const data = [
        { id: '1', value: 'foo' },
        { id: '2', value: 'bar' },
    ];
    // @ts-expect-error TS(2345): Argument of type '{ id: string; value: string; }[]... Remove this comment to see the full error message
    remove(data)(null, { id: 1 });
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(data).toEqual([{ id: '2', value: 'bar' }]);
});

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('removes with string input and data ids', () => {
    const data = [
        { id: 'abc', value: 'foo' },
        { id: 'def', value: 'bar' },
    ];
    // @ts-expect-error TS(2345): Argument of type '{ id: string; value: string; }[]... Remove this comment to see the full error message
    remove(data)(null, { id: 'abc' });
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(data).toEqual([{ id: 'def', value: 'bar' }]);
});

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test("doesn't confuse undefined id with the id 'undefined'", () => {
    const data = [{ value: 'foo' }, { id: 'def', value: 'bar' }];
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(remove(data)(null, { id: 'undefined' })).toBeUndefined();
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(data).toEqual([{ value: 'foo' }, { id: 'def', value: 'bar' }]);
});
