import { pluralize } from 'inflection';

import all from './Query/all';
import meta from './Query/meta';
import single from './Query/single';
import create from './Mutation/create';
import update from './Mutation/update';
import remove from './Mutation/remove';
import { getTypeNameFromKey } from '../introspection/getTypesFromData';

const getQueryResolvers = (entityName, data) => ({
    [`all${pluralize(entityName)}`]: all(data),
    [`_all${pluralize(entityName)}Meta`]: meta(data),
    [entityName]: single(data),
});

const getMutationResolvers = (entityName, data) => ({
    [`create${entityName}`]: create(data),
    [`update${entityName}`]: update(data),
    [`remove${entityName}`]: remove(data),
});

export default data => {
    return {
        Query: Object.keys(data).reduce(
            (resolvers, key) => ({
                ...resolvers,
                ...getQueryResolvers(getTypeNameFromKey(key), data[key]),
            }),
            {},
        ),
        Mutation: Object.keys(data).reduce(
            (resolvers, key) => ({
                ...resolvers,
                ...getMutationResolvers(getTypeNameFromKey(key), data[key]),
            }),
            {},
        ),
    };
};
