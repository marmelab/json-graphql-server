import graphqlHTTP from 'express-graphql';
import { printSchema } from 'graphql';
const { makeExecutableSchema } = require('graphql-tools');
import getSchemaFromData from './introspection/getSchemaFromData';
import resolver from './resolver';

/**
 * An express middleware for a GraphQL endpoint serving data from the supplied json.
 * 
 * @param {any} data 
 * @returns An array of middlewares
 * 
 * @example
 * import express from 'express';
 * import { jsonGraphqlExpress } from 'json-graphql-server';
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
 * const PORT = 3000;
 * var app = express();
 * 
 * app.use('/graphql', jsonGraphqlExpress(data));
 * 
 * app.listen(PORT);
 */
export default data =>
    graphqlHTTP({
        schema: makeExecutableSchema({
            typeDefs: printSchema(getSchemaFromData(data)),
            resolvers: resolver(data),
        }),
        graphiql: true,
    });
