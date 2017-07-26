import { pluralize, underscore } from 'inflection';

import all from './Query/all';
import meta from './Query/meta';
import single from './Query/single';
import create from './Mutation/create';
import update from './Mutation/update';
import remove from './Mutation/remove';
import { getTypeNamesFromData } from '../introspection/getTypesFromData';

const getData = (entityName, data) => data[underscore(pluralize(entityName))];

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
    const typeNames = getTypeNamesFromData(data);
    return {
        Query: typeNames.reduce(
            (resolvers, entityName) => ({
                ...resolvers,
                ...getQueryResolvers(entityName, getData(entityName, data)),
            }),
            {},
        ),
        Mutation: typeNames.reduce(
            (resolvers, entityName) => ({
                ...resolvers,
                ...getMutationResolvers(entityName, getData(entityName, data)),
            }),
            {},
        ),
    };
};
