import { fakeServer } from 'sinon';
import merge from 'lodash.merge';
import { graphql } from 'graphql';
import getSchemaFromData from './getSchemaFromData';

const defaultOptions = {
    autoRespond: true,
    url: 'http://localhost:3000/graphql',
};

/**
 * Starts a GraphQL Server in your browser: intercepts every call to http://localhost:3000/graphql 
 * and returns a response from the supplied data.
 * 
 * @export A sinon.js FakeServer (http://sinonjs.org/releases/v2.3.6/fake-xhr-and-server/#fake-server)
 * @param {any} data 
 * @param {any} options Options for sinon.js FakeServer (http://sinonjs.org/releases/v2.3.6/fake-xhr-and-server/#fake-server-options). 
 * Also accepts an url key specifying the endpoint to intercept (Default is 'http://localhost:3000/graphql').
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
 * GraphQLClientServer(data, {
 *      url: 'http://localhost:8080/api/graphql',
 *      autoRespondAfter: 1000,
 * });
 */
export default function(data, options) {
    const schema = getSchemaFromData(data);
    const { url, ...finalOptions } = merge({}, defaultOptions, options);

    const server = fakeServer.create(finalOptions);

    server.respondWith(url, xhr => {
        const query = xhr.requestBody;

        setTimeout(() => {
            graphql(schema, query)
                .then(result => {
                    xhr.respond(
                        200,
                        { 'Content-Type': 'application/json' },
                        JSON.stringify(result),
                    );
                })
                .catch(error => {
                    xhr.respond(
                        500,
                        { 'Content-Type': 'application/json' },
                        JSON.stringify(error),
                    );
                });
        }, 200);
    });

    return server;
}
