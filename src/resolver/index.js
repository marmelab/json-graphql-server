import { pluralize } from 'inflection';

import all from './Query/all';
import meta from './Query/meta';
import single from './Query/single';
import create from './Mutation/create';
import update from './Mutation/update';
import remove from './Mutation/remove';
import entityResolver from './Entity';
import { getTypeFromKey } from '../nameConverter';
import DateType from '../introspection/DateType';

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
                ...getQueryResolvers(getTypeFromKey(key), data[key]),
            }),
            {},
        ),
        Mutation: Object.keys(data).reduce(
            (resolvers, key) => ({
                ...resolvers,
                ...getMutationResolvers(getTypeFromKey(key), data[key]),
            }),
            {},
        ),
        ...Object.keys(data).reduce(
            (resolvers, key) => ({
                ...resolvers,
                [getTypeFromKey(key)]: entityResolver(key, data),
            }),
            {},
        ),
        Date: DateType, // required because makeExecutableSchema strips resolvers from typeDefs
    };
};
