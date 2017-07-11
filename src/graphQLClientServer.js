import { MockHttpServer } from './mockHttpRequest';
import { graphql } from 'graphql';
import getSchemaFromData from './introspection/getSchemaFromData';

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
export default function(data, url = 'http://localhost:3000/graphql') {
    const schema = getSchemaFromData(data);

    const server = new MockHttpServer(req => {
        if (!req.url.startsWith(url)) {
            // FIXME: if req.url does not match url for endpoint, handle it with window.OriginalHttpRequest
        }

        const query = JSON.parse(req.requestText);

        graphql(
            schema,
            query.query,
            undefined,
            undefined,
            query.variables,
        ).then(
            result => {
                const body = JSON.stringify(result);
                req.setResponseHeader('Content-Type', 'application/json');
                req.receive(200, body);
            },
            error => {
                req.setResponseHeader('Content-Type', 'application/json');
                req.receive(500, JSON.stringify(error));
            },
        );
    });

    server.start();
}
