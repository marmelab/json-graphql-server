import { GraphQLString, GraphQLID, GraphQLNonNull } from 'graphql';
import getFieldsFromEntities from './getFieldsFromEntities';

test('does infer field types', () => {
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
