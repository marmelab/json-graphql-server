import getTypeFromValues from './getTypeFromValues';

export const getValuesFromEntities = entities =>
    entities.reduce((values, entity) => {
        Object.keys(entity).forEach(fieldName => {
            if (!values[fieldName]) {
                values[fieldName] = [];
            }
            if (entity[fieldName] != null) {
                values[fieldName].push(entity[fieldName]);
            }
        });
        return values;
    }, {});

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
 * // {
 * //    id: { type: graphql.GraphQLString },
 * //    title: { type: graphql.GraphQLString },
 * //    views: { type: graphql.GraphQLInt }
 * //    user_id: { type: graphql.GraphQLString }
 * // };
 */
export default entities => {
    const fieldValues = getValuesFromEntities(entities);
    const nbValues = entities.length;
    return Object.keys(fieldValues).reduce((fields, fieldName) => {
        fields[fieldName] = {
            type: getTypeFromValues(
                fieldName,
                fieldValues[fieldName],
                fieldValues[fieldName] === nbValues,
            ),
        };
        return fields;
    }, {});
};
