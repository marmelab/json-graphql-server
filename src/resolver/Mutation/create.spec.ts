import create from './create';

test('returns a new object with id 0 on empty datastore', () => {
    expect(create()(null, {})).toEqual({ id: 0 });
});

test('returns a new object with incremental id', () => {
    const data = [{ id: 1 }, { id: 3 }];
    expect(create(data)(null, {})).toEqual({ id: 4 });
});

test('returns a new object using create data', () => {
    const data = [{ id: 0, value: 'foo' }];
    expect(create(data)(null, { value: 'toto' })).toEqual({
        id: 1,
        value: 'toto',
    });
});

test('creates a new record', () => {
    const data = [{ id: 1 }, { id: 3 }];
    create(data)(null, { value: 'foo' });
    expect(data).toEqual([{ id: 1 }, { id: 3 }, { id: 4, value: 'foo' }]);
});
