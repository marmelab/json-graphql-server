import { GraphQLObjectType, GraphQLString } from 'graphql';
import getTypesFromData from './getTypesFromData';

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
            id: { type: GraphQLString },
            title: { type: GraphQLString },
            views: { type: GraphQLString },
            user_id: { type: GraphQLString },
        },
    });
    const UsersType = new GraphQLObjectType({
        name: 'User',
        fields: {
            id: { type: GraphQLString },
            name: { type: GraphQLString },
        },
    });
    expect(getTypesFromData(data)).toEqual([PostType, UsersType]);
});
