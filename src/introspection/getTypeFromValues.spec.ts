import {
    GraphQLBoolean,
    GraphQLFloat,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLString,
} from 'graphql';
import GraphQLJSON from 'graphql-type-json';
import DateType from './DateType';
import getTypeFromValues from './getTypeFromValues';

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('returns GraphQLID for fields named id or xxx_id', () => {
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(getTypeFromValues('id')).toEqual(GraphQLID);
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(getTypeFromValues('foo_id')).toEqual(GraphQLID);
});

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('returns GraphQLList for arrays', () => {
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(getTypeFromValues('foo', [[true, false], [true]])).toEqual(
        new GraphQLList(GraphQLBoolean)
    );
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(
        getTypeFromValues('foo', [
            // @ts-expect-error TS(2322): Type 'string' is not assignable to type 'never'.
            ['a', 'b'],
            // @ts-expect-error TS(2322): Type 'string' is not assignable to type 'never'.
            ['c', 'd'],
        ])
    ).toEqual(new GraphQLList(GraphQLString));
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(
        getTypeFromValues('foo', [
            // @ts-expect-error TS(2322): Type 'number' is not assignable to type 'never'.
            [123, 456],
            // @ts-expect-error TS(2322): Type 'number' is not assignable to type 'never'.
            [789, 123],
        ])
    ).toEqual(new GraphQLList(GraphQLInt));
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(
        getTypeFromValues('foo', [
            // @ts-expect-error TS(2322): Type 'number' is not assignable to type 'never'.
            [1.23, 456],
            // @ts-expect-error TS(2322): Type 'number' is not assignable to type 'never'.
            [-5, 123],
        ])
    ).toEqual(new GraphQLList(GraphQLFloat));
});

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('returns GraphQLBoolean for booleans', () =>
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(getTypeFromValues('foo', [true, true, false])).toEqual(
        GraphQLBoolean
    ));

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('returns GraphQLString for strings', () => {
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(getTypeFromValues('foo', ['123', '456'])).toEqual(GraphQLString);
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(getTypeFromValues('foo', ['abc', '123'])).toEqual(GraphQLString);
});

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('returns GraphQLInt for integers', () =>
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(getTypeFromValues('foo', [-1, 445, 34, 0])).toEqual(GraphQLInt));

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('returns GraphQLFloat for floats', () =>
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(getTypeFromValues('foo', [-12, 1.2, 445, 0])).toEqual(GraphQLFloat));

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('returns DateType for Dates', () =>
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(
        // @ts-expect-error TS(2322): Type 'Date' is not assignable to type 'never'.
        getTypeFromValues('foo', [new Date('2017-03-15'), new Date()])
    ).toEqual(DateType));
// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('returns DateType for Dates as ISO Strings', () =>
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(
        getTypeFromValues('foo', [
            // @ts-expect-error TS(2322): Type 'string' is not assignable to type 'never'.
            '2022-01-01T00:00:00.000Z',
            // @ts-expect-error TS(2322): Type 'string' is not assignable to type 'never'.
            '2022-12-01T12:34:56.000Z',
        ])
    ).toEqual(DateType));

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('returns GraphQLJSON for objects', () =>
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(
        // @ts-expect-error TS(2322): Type 'number' is not assignable to type 'never'.
        getTypeFromValues('foo', [{ foo: 1 }, { bar: 2 }, { id: 'a' }])
    ).toEqual(GraphQLJSON));

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('returns GraphQLJSON for arrays of objects', () =>
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(
        // @ts-expect-error TS(2322): Type 'number' is not assignable to type 'never'.
        getTypeFromValues('foo', [[{ foo: 1 }, { bar: 2 }], [{ id: 'a' }]])
    ).toEqual(GraphQLJSON));

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('returns GraphQLString for mixed values', () =>
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(getTypeFromValues('foo', [0, '&', new Date()])).toEqual(
        GraphQLString
    ));

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('returns GraphQLString for no values', () =>
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(getTypeFromValues('foo')).toEqual(GraphQLString));

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('returns GraphQLNonNull when all values are filled', () =>
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(getTypeFromValues('foo', [], true)).toEqual(
        new GraphQLNonNull(GraphQLString)
    ));
