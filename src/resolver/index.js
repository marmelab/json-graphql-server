import { pluralize } from 'inflection';
import GraphQLJSON from 'graphql-type-json';

import all from './Query/all';
import meta from './Query/meta';
import single from './Query/single';
import create from './Mutation/create';
import createMany from './Mutation/createMany';
import update from './Mutation/update';
import remove from './Mutation/remove';
import entityResolver from './Entity';
import { getTypeFromKey } from '../nameConverter';
import DateType from '../introspection/DateType';
import hasType from '../introspection/hasType';

const getQueryResolvers = (entityName, data) => ({
    [`all${pluralize(entityName)}`]: all(data),
    [`_all${pluralize(entityName)}Meta`]: meta(data),
    [entityName]: single(data),
});

const getMutationResolvers = (entityName, data) => ({
    [`create${entityName}`]: create(data),
    [`createMany${entityName}`]: createMany(data),
    [`update${entityName}`]: update(data),
    [`remove${entityName}`]: remove(data),
});

export default (data) => {
    return Object.assign(
        {},
        {
            Query: Object.keys(data).reduce(
                (resolvers, key) =>
                    Object.assign(
                        {},
                        resolvers,
                        getQueryResolvers(getTypeFromKey(key), data[key])
                    ),
                {}
            ),
            Mutation: Object.keys(data).reduce(
                (resolvers, key) =>
                    Object.assign(
                        {},
                        resolvers,
                        getMutationResolvers(getTypeFromKey(key), data[key])
                    ),
                {}
            ),
        },
        Object.keys(data).reduce(
            (resolvers, key) =>
                Object.assign({}, resolvers, {
                    [getTypeFromKey(key)]: entityResolver(key, data),
                }),
            {}
        ),
        hasType('Date', data) ? { Date: DateType } : {}, // required because makeExecutableSchema strips resolvers from typeDefs
        hasType('JSON', data) ? { JSON: GraphQLJSON } : {} // required because makeExecutableSchema strips resolvers from typeDefs
    );
};
