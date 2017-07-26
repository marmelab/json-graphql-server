import { pluralize, underscore } from 'inflection';

import all from './all';
import meta from './meta';
import single from './single';
import create from './create';
import update from './update';
import remove from './remove';
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
