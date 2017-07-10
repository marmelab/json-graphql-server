import {
    GraphQLFloat,
    GraphQLID,
    GraphQLInt,
    GraphQLNonNull,
    GraphQLString,
} from 'graphql';
import getTypeFromValues from './getTypeFromValues';

test('returns GraphQLID for fields named id or xxx_id', () => {
    expect(getTypeFromValues('id')).toEqual(GraphQLID);
    expect(getTypeFromValues('foo_id')).toEqual(GraphQLID);
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
