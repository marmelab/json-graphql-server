import { makeExecutableSchema } from '@graphql-tools/schema';
import { printSchema } from 'graphql';
import getSchemaFromData from './introspection/getSchemaFromData';
import resolver from './resolver';
import type { Data } from './types';

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
export default (data: Data) =>
    makeExecutableSchema({
        typeDefs: printSchema(getSchemaFromData(data)),
        resolvers: resolver(data),
    });

// Same as above, simply returning the object before making it executable.
// This lets you use it with a custom apollo server or etc.
export const getPlainSchema = (data: Data) => ({
    typeDefs: printSchema(getSchemaFromData(data)),
    resolvers: resolver(data),
});
