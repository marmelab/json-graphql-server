import getValuesFromEntities from './getValuesFromEntities';

test('does not take empty values into account', () => {
    expect(getValuesFromEntities([{ foo: null }, {}, { foo: 'bar' }])).toEqual({
        foo: ['bar'],
    });
});
test('returns an array of values for every field', () => {
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
test('does not ignore duplicate values', () => {
    expect(getValuesFromEntities([{ foo: 'bar' }, { foo: 'bar' }])).toEqual({
        foo: ['bar', 'bar'],
    });
});
test('can handle sparse fieldsets', () => {
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
