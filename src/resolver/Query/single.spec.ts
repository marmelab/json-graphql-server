import single from './single';

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('returns undefined by default', () => {
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(single()(null, {})).toBeUndefined();
});

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('returns record when found', () => {
    const data = [
        { id: 1, value: 'foo' },
        { id: 2, value: 'bar' },
    ];
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(single(data)(null, { id: 1 })).toEqual({ id: 1, value: 'foo' });
});

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('returns undefined when not found', () => {
    const data = [
        { id: 1, value: 'foo' },
        { id: 2, value: 'bar' },
    ];
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(single(data)(null, { id: 3 })).toBeUndefined();
});
