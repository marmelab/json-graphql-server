import { GraphQLObjectType } from 'graphql';
import { singularize, camelize } from 'inflection';

import getFieldsFromEntities from './getFieldsFromEntities';
import { getTypeFromKey } from '../nameConverter';

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
 * //         name: "Users",
 * //         fields: {
 * //             id: { type: graphql.GraphQLString },
 * //             name: { type: graphql.GraphQLString },
 * //         }
 * //     }),
 * // ]
 */
export default (data) =>
    Object.keys(data)
        .map((typeName) => ({
            name: camelize(singularize(typeName)),
            fields: getFieldsFromEntities(data[typeName]),
        }))
        .map((typeObject) => new GraphQLObjectType(typeObject));

export const getTypeNamesFromData = (data) =>
    Object.keys(data).map(getTypeFromKey);
