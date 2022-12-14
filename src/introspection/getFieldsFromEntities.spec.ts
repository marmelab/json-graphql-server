import { GraphQLString, GraphQLID, GraphQLNonNull } from 'graphql';
import getFieldsFromEntities from './getFieldsFromEntities';

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('does infer field types', () => {
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(
        getFieldsFromEntities([
            { id: 1, foo: 'foo1' },
            { id: 2, foo: 'foo2', bar: 'bar1' },
            { id: 3, bar: 'bar2' },
        ])
    ).toEqual({
        id: { type: new GraphQLNonNull(GraphQLID) },
        foo: { type: GraphQLString },
        bar: { type: GraphQLString },
    });
});
