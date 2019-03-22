import remove from './remove';

test('returns undefined by default', () => {
    expect(remove()(null, {})).toBeUndefined();
});

test('returns removed record when found', () => {
    const data = [{ id: 1, value: 'foo' }, { id: 2, value: 'bar' }];
    expect(remove(data)(null, { id: 1 })).toEqual({ id: 1, value: 'foo' });
    expect(data).toEqual([{ id: 2, value: 'bar' }]);
});

test('returns undefined when not found', () => {
    const data = [{ id: 1, value: 'foo' }, { id: 2, value: 'bar' }];
    expect(remove(data)(null, { id: 3 })).toBeUndefined();
});

test('leaves data unmodified when not found', () => {
    const data = [{ id: 1, value: 'foo' }, { id: 2, value: 'bar' }];
    const originalData = [...data];
    expect(remove(data)(null, { id: 3 })).toBeUndefined();
    expect(data).toEqual(originalData);
});

test('removes record when found', () => {
    const data = [{ id: 1, value: 'foo' }, { id: 2, value: 'bar' }];
    remove(data)(null, { id: 1 });
    expect(data).toEqual([{ id: 2, value: 'bar' }]);
});
