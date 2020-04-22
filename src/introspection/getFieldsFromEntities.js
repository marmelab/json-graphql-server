import getTypeFromValues from './getTypeFromValues';
import getValuesFromEntities from './getValuesFromEntities';

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
 *         "user_id": 456,
 *     },
 * ];
 * const types = getFieldsFromEntities(entities);
 * // {
 * //    id: { type: new GraphQLNonNull(GraphQLString) },
 * //    title: { type: new GraphQLNonNull(GraphQLString) },
 * //    views: { type: GraphQLInt },
 * //    user_id: { type: new GraphQLNonNull(GraphQLString) },
 * // };
 */
export default (entities, checkRequired = true) => {
    const fieldValues = getValuesFromEntities(entities);
    const nbValues = entities.length;
    return Object.keys(fieldValues).reduce((fields, fieldName) => {
        fields[fieldName] = {
            type: getTypeFromValues(
                fieldName,
                fieldValues[fieldName],
                checkRequired
                    ? fieldValues[fieldName].length === nbValues
                    : false
            ),
        };
        return fields;
    }, {});
};
