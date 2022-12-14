import { makeExecutableSchema } from 'graphql-tools';
import { printSchema } from 'graphql';
import getSchemaFromData from './introspection/getSchemaFromData';
import resolver from './resolver';

/**
 * Generates a GraphQL Schema object for your data
 *
 * @param {any} data
 * @returns A GraphQL Schema
 *
 * @example
 * import {graphql} from 'graphql';
 * import {jsonSchemaBuilder} from 'json-graphql-server';
 *
 * const data = {
 *    "posts": [
 *        {
 *            "id": 1,
 *            "title": "Lorem Ipsum",
 *            "views": 254,
 *            "user_id": 123,
 *        },
 *        {
 *            "id": 2,
 *            "title": "Sic Dolor amet",
 *            "views": 65,
 *            "user_id": 456,
 *        },
 *    ],
 *    "users": [
 *        {
 *            "id": 123,
 *            "name": "John Doe"
 *        },
 *        {
 *            "id": 456,
 *            "name": "Jane Doe"
 *        }
 *    ],
 * };
 *
 * const schema = jsonSchemaBuilder(data);
 * const query = `[...]`
 * graphql(schema, query).then(result => {
 *   console.log(result);
 * });
 *
 */
export default (data: any) => makeExecutableSchema({
    typeDefs: printSchema(getSchemaFromData(data)),
    resolvers: resolver(data),
    // @ts-expect-error TS(2345): Argument of type '{ typeDefs: string; resolvers: a... Remove this comment to see the full error message
    logger: { log: (e: any) => console.log(e) }, // eslint-disable-line no-console
});

// Same as above, simply returning the object before making it executable.
// This lets you use it with a custom apollo server or etc.
export const getPlainSchema = (data: any) => ({
    typeDefs: printSchema(getSchemaFromData(data)),
    resolvers: resolver(data)
});
