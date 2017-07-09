import { GraphQLObjectType, GraphQLInt, GraphQLList } from 'graphql';

import getFieldsFromEntities from './getFieldsFromEntities';

const ucfirst = string => string.charAt(0).toUpperCase() + string.slice(1);

/**
 * Get a list of GraphQLObjectType from data
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
 * // [
 * //     new GraphQLObjectType({
 * //         name: "Posts",
 * //         fields: {
 * //             id: { type: graphql.GraphQLString },
 * //             title: { type: graphql.GraphQLString },
 * //             views: { type: graphql.GraphQLInt },
 * //             user_id: { type: graphql.GraphQLString },
 * //         }
 * //     }),
 * //     new GraphQLObjectType({
 * //         name: 'PostsPage',
 * //         fields: {
 * //             items: { type: new GraphQLList(PostType) },
 * //             totalCount: { type: GraphQLInt },
 * //         },
 * //     }),
 * //     new GraphQLObjectType({
 * //         name: "Users",
 * //         fields: {
 * //             id: { type: graphql.GraphQLString },
 * //             name: { type: graphql.GraphQLString },
 * //         }
 * //     }),
 * //     new GraphQLObjectType({
 * //         name: 'UsersPage',
 * //         fields: {
 * //             items: { type: new GraphQLList(UsersType) },
 * //             totalCount: { type: GraphQLInt },
 * //         },
 * //     });
 * // ]
 */
export default data =>
    Object.keys(data)
        .map(typeName => ({
            name: ucfirst(typeName),
            fields: getFieldsFromEntities(data[typeName]),
        }))
        .map(typeObject => new GraphQLObjectType(typeObject))
        .reduce((types, type) => {
            types.push(type);
            types.push(
                new GraphQLObjectType({
                    name: `${type.name}Page`,
                    fields: {
                        items: { type: new GraphQLList(type) },
                        totalCount: { type: GraphQLInt },
                    },
                }),
            );
            return types;
        }, []);
