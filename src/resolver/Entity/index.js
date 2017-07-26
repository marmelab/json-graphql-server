import getFieldsFromEntities from '../../introspection/getFieldsFromEntities';
import { getRelatedKey, getRelatedType } from '../../nameConverter';
import { isRelationshipField } from '../../relationships';

export default (key, data) =>
    Object.keys(getFieldsFromEntities(data[key]))
        .filter(isRelationshipField)
        .reduce(
            (resolvers, fieldName) => ({
                ...resolvers,
                [getRelatedType(fieldName)]: entity =>
                    data[getRelatedKey(fieldName)].find(
                        relatedRecord => relatedRecord.id == entity[fieldName],
                    ),
            }),
            {},
        );
