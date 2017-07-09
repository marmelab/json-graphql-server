import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
} from 'graphql';
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
        name: 'Posts',
        fields: {
            id: { type: GraphQLString },
            title: { type: GraphQLString },
            views: { type: GraphQLString },
            user_id: { type: GraphQLString },
        },
    });
    const PostPageType = new GraphQLObjectType({
        name: 'PostsPage',
        fields: {
            items: { type: new GraphQLList(PostType) },
            totalCount: { type: GraphQLInt },
        },
    });
    const UsersType = new GraphQLObjectType({
        name: 'Users',
        fields: {
            id: { type: GraphQLString },
            name: { type: GraphQLString },
        },
    });
    const UsersPageType = new GraphQLObjectType({
        name: 'UsersPage',
        fields: {
            items: { type: new GraphQLList(UsersType) },
            totalCount: { type: GraphQLInt },
        },
    });
    expect(getTypesFromData(data)).toEqual([
        PostType,
        PostPageType,
        UsersType,
        UsersPageType,
    ]);
});
