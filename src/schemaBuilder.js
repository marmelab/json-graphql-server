import { makeExecutableSchema } from 'graphql-tools';
import { printSchema } from 'graphql';
import getSchemaFromData from './introspection/getSchemaFromData';
import resolver from './resolver';

export default data =>
    makeExecutableSchema({
        typeDefs: printSchema(getSchemaFromData(data)),
        resolvers: resolver(data),
        logger: { log: e => console.log(e) }, // eslint-disable-line no-console
    });
