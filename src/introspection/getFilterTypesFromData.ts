import {
    GraphQLBoolean,
    GraphQLInputObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLFloat,
    GraphQLList,
    GraphQLID,
} from 'graphql';
import getFieldsFromEntities from './getFieldsFromEntities';
import getValuesFromEntities from './getValuesFromEntities';
import getTypeFromValues from './getTypeFromValues';
import { getTypeFromKey } from '../nameConverter';

const getRangeFiltersFromEntities = (entities) => {
    const fieldValues = getValuesFromEntities(entities);
    return Object.keys(fieldValues).reduce((fields, fieldName) => {
        const fieldType = getTypeFromValues(
            fieldName,
            fieldValues[fieldName],
            false
        );
        if (
            fieldType == GraphQLInt ||
            fieldType == GraphQLFloat ||
            fieldType.name == 'Date'
        ) {
            fields[`${fieldName}_lt`] = { type: fieldType };
            fields[`${fieldName}_lte`] = { type: fieldType };
            fields[`${fieldName}_gt`] = { type: fieldType };
            fields[`${fieldName}_gte`] = { type: fieldType };
        }

        if (fieldType != GraphQLBoolean && fieldType != GraphQLList) {
            fields[`${fieldName}_neq`] = { type: fieldType };
        }
        return fields;
    }, {});
};

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
 * //             views_lt: { type: GraphQLInt },
 * //             views_lte: { type: GraphQLInt },
 * //             views_gt: { type: GraphQLInt },
 * //             views_gte: { type: GraphQLInt },
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
export default (data) =>
    Object.keys(data).reduce(
        (types, key) =>
            Object.assign({}, types, {
                [getTypeFromKey(key)]: new GraphQLInputObjectType({
                    name: `${getTypeFromKey(key)}Filter`,
                    fields: Object.assign(
                        {
                            q: { type: GraphQLString },
                        },
                        {
                            ids: { type: new GraphQLList(GraphQLID) },
                        },
                        getFieldsFromEntities(data[key], false),
                        getRangeFiltersFromEntities(data[key])
                    ),
                }),
            }),
        {}
    );
