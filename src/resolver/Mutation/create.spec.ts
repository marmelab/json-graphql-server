import create from './create';

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('returns a new object with id 0 on empty datastore', () => {
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(create()(null, {})).toEqual({ id: 0 });
});

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('returns a new object with incremental id', () => {
    const data = [{ id: 1 }, { id: 3 }];
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(create(data)(null, {})).toEqual({ id: 4 });
});

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('returns a new object using create data', () => {
    const data = [{ id: 0, value: 'foo' }];
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(create(data)(null, { value: 'toto' })).toEqual({
        id: 1,
        value: 'toto',
    });
});

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('creates a new record', () => {
    const data = [{ id: 1 }, { id: 3 }];
    // @ts-expect-error TS(2345): Argument of type '{ id: number; }[]' is not assign... Remove this comment to see the full error message
    create(data)(null, { value: 'foo' });
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(data).toEqual([{ id: 1 }, { id: 3 }, { id: 4, value: 'foo' }]);
});
