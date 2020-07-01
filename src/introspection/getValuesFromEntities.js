/**
 * Gets a list of values indexed by field based on a list of entities
 *
 * @example
 * const entities = [
 *     {
 *         id: 1,
 *         title: "Lorem Ipsum",
 *         views: 254,
 *         user_id: 123,
 *     },
 *     {
 *         id: 2,
 *         title: "Sic Dolor amet",
 *         views: 65,
 *         user_id: 456,
 *     },
 * ];
 * getValuesFromEntities(entities);
 * // {
 * //    id: [1, 2],
 * //    title: ["Lorem Ipsum", "Sic Dolor amet"],
 * //    views: [254, 65],
 * //    user_id: [123, 456],
 * // }
 */
export default (entities) =>
    entities.reduce((values, entity) => {
        Object.keys(entity).forEach((fieldName) => {
            if (!values[fieldName]) {
                values[fieldName] = [];
            }
            if (entity[fieldName] != null) {
                values[fieldName].push(entity[fieldName]);
            }
        });
        return values;
    }, {});
