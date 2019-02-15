import { makeExecutableSchema } from 'graphql-tools';
import { printSchema } from 'graphql';
import getSchemaFromData from './introspection/getSchemaFromData';
import resolver from './resolver';

export default (data, options) =>
    makeExecutableSchema({
        typeDefs: printSchema(getSchemaFromData(data, options)),
        resolvers: resolver(data, options),
        logger: { log: e => console.log(e) }, // eslint-disable-line no-console
    });
