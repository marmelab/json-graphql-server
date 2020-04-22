import mock, { proxy } from 'xhr-mock';
import handleRequestFactory from './handleRequest';

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
export default function ({ data, url }) {
    const handleRequest = handleRequestFactory(data);

    return {
        start() {
            // Intercept all XmlHttpRequest
            mock.setup();

            // Only handle POST request to the specified url
            mock.post(
                url,
                (req, res) =>
                    new Promise((resolve) => {
                        handleRequest(url, {
                            body: req.body(),
                        }).then((response) => {
                            res.status(response.status);
                            res.headers(response.headers);
                            res.body(response.body);

                            resolve(res);
                        });
                    })
            );

            // Ensure all other requests are handled by the default XmlHttpRequest
            mock.use(proxy);
        },
        stop() {
            mock.teardown();
        },
        getHandler() {
            return handleRequest;
        },
    };
}
