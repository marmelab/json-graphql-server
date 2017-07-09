import getTypeFromValue from './getTypeFromValue';

/**
 * Get a list of GraphQL fields from a list of entities
 * 
 * @example
 * const entities = [
 *     {
 *         "id": 1,
 *         "title": "Lorem Ipsum",
 *         "views": 254,
 *         "user_id": 123,
 *     },
 *     {
 *         "id": 2,
 *         "title": "Sic Dolor amet",
 *         "views": 65,
 *         "user_id": 456,
 *     },
 * ];
 * const types = getFieldsFromData(entities);
 * // [
 *     id: { type: graphql.GraphQLString },
 *     title: { type: graphql.GraphQLString },
 *     views: { type: graphql.GraphQLInt }
 *     user_id: { type: graphql.GraphQLString }
 * ];
 */
export default data => {
    const fields = {};
    data.map(record => {
        Object.keys(record).forEach(recordField => {
            if (!fields[recordField]) {
                fields[recordField] = {
                    type: getTypeFromValue(recordField, record[recordField]),
                };
            }
        });
    });
    return fields;
};
