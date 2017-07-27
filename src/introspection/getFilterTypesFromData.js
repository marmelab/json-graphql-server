import { GraphQLInputObjectType, GraphQLString } from 'graphql';
import getFieldsFromEntities from './getFieldsFromEntities';
import { getTypeFromKey } from '../nameConverter';

/**
 * Get a list of GraphQLObjectType for filtering data
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
 * const types = getFilterTypesFromData(data);
 * // {
 * //     posts: new GraphQLInputObjectType({
 * //         name: "PostFilter",
 * //         fields: {
 * //             q: { type: GraphQLString },
 * //             id: { type: GraphQLString },
 * //             title: { type: GraphQLString },
 * //             views: { type: GraphQLInt },
 * //             user_id: { type: GraphQLString },
 * //         }
 * //     }),
 * //     users: new GraphQLObjectType({
 * //         name: "UserFilter",
 * //         fields: {
 * //             q: { type: GraphQLString },
 * //             id: { type: GraphQLString },
 * //             name: { type: GraphQLString },
 * //         }
 * //     }),
 * // }
 */
export default data =>
    Object.keys(data).reduce(
        (types, key) => ({
            ...types,
            [getTypeFromKey(key)]: new GraphQLInputObjectType({
                name: `${getTypeFromKey(key)}Filter`,
                fields: {
                    q: { type: GraphQLString },
                    ...getFieldsFromEntities(data[key], false),
                },
            }),
        }),
        {},
    );
