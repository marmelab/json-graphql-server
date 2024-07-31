import { graphql } from 'graphql';
import schemaBuilder from './schemaBuilder';
import type { Data } from './types';

/**
 * Starts a GraphQL Server in your browser: intercepts every call to http://localhost:3000/graphql
 * and returns a response from the supplied data.
 *
 * @export A sinon.js FakeServer (http://sinonjs.org/releases/v2.3.6/fake-xhr-and-server/#fake-server)
 * @param {any} data
 * @param {any} url Specifies the endpoint to intercept (Default is 'http://localhost:3000/graphql').
 *
 * @example
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
 * GraphQLClientServer(data);
 * GraphQLClientServer(data, 'http://localhost:8080/api/graphql');
 */
export default function (data: Data) {
    const schema = schemaBuilder(data);
    return (url: any, opts: any = {}) => {
        let body = opts.body;

        if (url.requestBody) {
            body = url.requestBody;
        }

        const query = JSON.parse(body);

        return graphql({
            schema,
            source: query.query,
            variableValues: query.variables,
        }).then(
            (result) => ({
                status: 200,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(result),
            }),
            (error) => ({
                status: 500,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(error),
            }),
        );
    };
}
