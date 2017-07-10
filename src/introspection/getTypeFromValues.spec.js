import {
    GraphQLBoolean,
    GraphQLFloat,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLString,
} from 'graphql';
import getTypeFromValues from './getTypeFromValues';

test('returns GraphQLID for fields named id or xxx_id', () => {
    expect(getTypeFromValues('id')).toEqual(GraphQLID);
    expect(getTypeFromValues('foo_id')).toEqual(GraphQLID);
});

test('returns GraphQLList for arrays', () => {
    expect(getTypeFromValues('foo', [[true, false], [true]])).toEqual(
        new GraphQLList(GraphQLBoolean),
    );
    expect(getTypeFromValues('foo', [['a', 'b'], ['c', 'd']])).toEqual(
        new GraphQLList(GraphQLString),
    );
    expect(getTypeFromValues('foo', [[123, 456], [789, 123]])).toEqual(
        new GraphQLList(GraphQLInt),
    );
    expect(getTypeFromValues('foo', [[1.23, 456], [-5, 123]])).toEqual(
        new GraphQLList(GraphQLFloat),
    );
});

test('returns GraphQLBoolean for booleans', () => {
    expect(getTypeFromValues('foo', [true, true, false])).toEqual(
        GraphQLBoolean,
    );
});

test('returns GraphQLString for strings', () => {
    expect(getTypeFromValues('foo', ['123', '456'])).toEqual(GraphQLString);
    expect(getTypeFromValues('foo', ['abc', '123'])).toEqual(GraphQLString);
});

test('returns GraphQLInt for integers', () => {
    expect(getTypeFromValues('foo', [-1, 445, 34, 0])).toEqual(GraphQLInt);
});

test('returns GraphQLFloat for floats', () => {
    expect(getTypeFromValues('foo', [-12, 1.2, 445, 0])).toEqual(GraphQLFloat);
});

test('returns GraphQLString by default', () => {
    expect(getTypeFromValues('foo')).toEqual(GraphQLString);
});

test('returns GraphQLNonNull when all values are filled', () => {
    expect(getTypeFromValues('foo', [], true)).toEqual(
        new GraphQLNonNull(GraphQLString),
    );
});
