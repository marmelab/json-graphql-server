import update from './update';

test('returns undefined by default', () => {
    expect(update()(null, {})).toBeUndefined();
});

test('returns updated record when found', () => {
    const data = [{ id: 1, value: 'foo', bar: 'baz' }];
    expect(update(data)(null, { id: 1, value: 'bar' })).toEqual({
        id: 1,
        value: 'bar',
        bar: 'baz',
    });
});

test('returns undefined when not found', () => {
    const data = [
        { id: 1, value: 'foo' },
        { id: 2, value: 'bar' },
    ];
    expect(update(data)(null, { id: 3 })).toBeUndefined();
});

test('updates record when found', () => {
    const data = [{ id: 1, value: 'foo' }];
    update(data)(null, { id: 1, value: 'bar', bar: 'baz' });
    expect(data).toEqual([{ id: 1, value: 'bar', bar: 'baz' }]);
});

test('updates record with string id', () => {
    const data = [{ id: 'abc', value: 'foo' }];
    update(data)(null, { id: 'abc', value: 'bar', bar: 'baz' });
    expect(data).toEqual([{ id: 'abc', value: 'bar', bar: 'baz' }]);
});

test('removes property when setting the value to undefined', () => {
    const data = [{ id: 1, value: 'foo' }];
    update(data)(null, { id: 1, value: undefined });
    expect(data).toEqual([{ id: 1 }]);
});

test("doesn't confuse undefined id with the id 'undefined'", () => {
    const data = [{ value: 'foo' }];
    expect(
        update(data)(null, { id: 'undefined', value: 'bar', bar: 'baz' })
    ).toBeUndefined();
    expect(data).toEqual([{ value: 'foo' }]);
});
