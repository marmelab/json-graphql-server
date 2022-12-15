import createMany from './createMany';

test('returns a new object with id 0 on empty datastore', () => {
    expect(createMany()(null, { data: [{}] })).toEqual([{ id: 0 }]);
});

test('returns a new object with incremental id', () => {
    const data = [{ id: 1 }, { id: 3 }];
    expect(createMany(data)(null, { data: [{}] })).toEqual([{ id: 4 }]);
});

test('returns a new object using create data', () => {
    const data = [{ id: 0, value: 'foo' }];
    expect(createMany(data)(null, { data: [{ value: 'toto' }] })).toEqual([
        {
            id: 1,
            value: 'toto',
        },
    ]);
});

test('creates a new record', () => {
    const data = [{ id: 1 }, { id: 3 }];
    createMany(data)(null, { data: [{ value: 'foo' }] });
    expect(data).toEqual([{ id: 1 }, { id: 3 }, { id: 4, value: 'foo' }]);
});

test('creates multiple new records', () => {
    const data = [{ id: 1 }, { id: 3 }];
    createMany(data)(null, {
        data: [{ value: 'foo' }, { value: 'bar' }, { value: 'baz' }],
    });
    expect(data).toEqual([
        { id: 1 },
        { id: 3 },
        { id: 4, value: 'foo' },
        { id: 5, value: 'bar' },
        { id: 6, value: 'baz' },
    ]);
});
