import {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLList,
    GraphQLInt,
} from 'graphql';

import getTypesFromData from './getTypesFromData';

/**
 * Get a GraphQL schema from data
 * 
 * @example
 * const data = {
 *    "posts": [
 *        {
 *            "id": 1,
 *            "title": "Lorem Ipsum",
 *            "views": 254,
 *            "user_id": 123,
 *        },
 *        {
 *            "id": 2,
 *            "title": "Sic Dolor amet",
 *            "views": 65,
 *            "user_id": 456,
 *        },
 *    ],
 *    "users": [
 *        {
 *            "id": 123,
 *            "name": "John Doe"
 *        },
 *        {
 *            "id": 456,
 *            "name": "Jane Doe"
 *        }
 *    ],
 * };
 * const types = getTypesFromData(data);
 * // type Post {
 * //     id: ID
 * //     title: String
 * //     views: Int
 * //     user_id: ID
 * // }
 * //
 * // type PostPage {
 * //     items: [Post]
 * //     totalCount: Int
 * // }
 * //
 * // type User {
 * //     id: ID
 * //     name: String
 * // }
 * //
 * // type UserPage {
 * //     items: [User]
 * //     totalCount: Int
 * // }
 * //
 * // type Query {
 * //     getPageOfPost(page: Int, perPage: Int, sortField: String, sortOrder: String, filter: String): PostPage
 * //     getPost(id: ID!): Post
 * //
 * //     getPageOfUser(page: Int, perPage: Int, sortField: String, sortOrder: String, filter: String): UserPage
 * //     getUser(id: ID!): User
 * // }
 * //
 * // type Mutation {
 * //     createPost(data: String): Post
 * //     updatePost(data: String): Post
 * //     removePost(id: ID!): Boolean

 * //     createUser(data: String): User
 * //     updateUser(data: String): User
 * //     removeUser(id: ID!): Boolean
 * // }
 */
export default data => {
    const types = getTypesFromData(data);
    const typesByName = types.reduce((types, type) => {
        types[type.name] = type;
        return types;
    }, {});
    const pageTypesByName = types.reduce((types, type) => {
        types[type.name] = new GraphQLObjectType({
            name: `${type.name}Page`,
            fields: {
                items: { type: new GraphQLList(type) },
                totalCount: { type: GraphQLInt },
            },
        });
        return types;
    }, {});
    const queryType = new GraphQLObjectType({
        name: 'Query',
        fields: types.reduce((fields, type) => {
            fields[`get${type.name}`] = { type: typesByName[type.name] };
            fields[`getPageOf${type.name}`] = {
                type: pageTypesByName[type.name],
            };
            return fields;
        }, {}),
    });
    return new GraphQLSchema({ query: queryType });
};
