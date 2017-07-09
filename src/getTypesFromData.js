import { GraphQLObjectType } from 'graphql';

import getFieldsFromData from './getFieldsFromData';

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
 *      new GraphQLObjectType({
 *          name: "posts",
 *          fields: [
 *              id: { type: graphql.GraphQLString },
 *              title: { type: graphql.GraphQLString },
 *              views: { type: graphql.GraphQLInt }
 *              user_id: { type: graphql.GraphQLString }
 *          ]
 *      }),
 *      new GraphQLObjectType({
 *          name: "users",
 *          fields: [
 *              id: { type: graphql.GraphQLString },
 *              name: { type: graphql.GraphQLString },
 *          ]
 *      }),
 * ]
 */
export default data =>
    Object.keys(data)
        .map(typeName => ({
            name: typeName,
            fields: getFieldsFromData(data[typeName]),
        }))
        .map(typeObject => new GraphQLObjectType(typeObject));
