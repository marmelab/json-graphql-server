import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLInt,
    GraphQLNonNull,
} from 'graphql';
import getTypesFromData from './getTypesFromData';

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('Integration test', () => {
    const data = {
        posts: [
            {
                id: 1,
                title: 'Lorem Ipsum',
                views: 254,
                user_id: 123,
            },
            {
                id: 2,
                title: 'Sic Dolor amet',
                views: 65,
                user_id: 456,
            },
        ],
        users: [
            {
                id: 123,
                name: 'John Doe',
            },
            {
                id: 456,
                name: 'Jane Doe',
            },
        ],
    };
    const PostType = new GraphQLObjectType({
        name: 'Post',
        fields: {
            id: { type: new GraphQLNonNull(GraphQLID) },
            title: { type: new GraphQLNonNull(GraphQLString) },
            views: { type: new GraphQLNonNull(GraphQLInt) },
            user_id: { type: new GraphQLNonNull(GraphQLID) },
        },
    });
    const UsersType = new GraphQLObjectType({
        name: 'User',
        fields: {
            id: { type: new GraphQLNonNull(GraphQLID) },
            name: { type: new GraphQLNonNull(GraphQLString) },
        },
    });
    const types = getTypesFromData(data);
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(types.map((t) => t.toString())).toEqual(['Post', 'User']);
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(types.map((t) => t.getFields())).toEqual([
        PostType.getFields(),
        UsersType.getFields(),
    ]);
});
