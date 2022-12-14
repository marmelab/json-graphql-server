// @ts-expect-error TS(7016): Could not find a declaration file for module 'expr... Remove this comment to see the full error message
import express from 'express';
// @ts-expect-error TS(7016): Could not find a declaration file for module 'supe... Remove this comment to see the full error message
import request from 'supertest';
import jsonGraphqlExpress from './jsonGraphqlExpress';

const data = {
    posts: [
        {
            id: 1,
            title: 'Lorem Ipsum',
            views: 254,
            user_id: 123,
        },
        {
            id: 2,
            title: 'Ut enim ad minim veniam',
            views: 65,
            user_id: 456,
        },
        {
            id: 3,
            title: 'Sic Dolor amet',
            views: 76,
            user_id: 123,
        },
    ],
    users: [
        { id: 123, name: 'John Doe' },
        { id: 456, name: 'Jane Doe' },
    ],
    comments: [
        { id: 987, post_id: 1, body: 'Consectetur adipiscing elit' },
        { id: 995, post_id: 1, body: 'Nam molestie pellentesque dui' },
        { id: 998, post_id: 2, body: 'Sunt in culpa qui officia' },
    ],
};

let agent: any;

// @ts-expect-error TS(2304): Cannot find name 'beforeAll'.
beforeAll(() => {
    const app = express();
    app.use('/', jsonGraphqlExpress(data));
    agent = request(app);
});

const gqlAgent = (query: any, variables: any) =>
    agent.post('/').send({
        query,
        variables,
    });

// @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe('integration tests', () => {
    // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('returns all entities by default', () =>
        // @ts-expect-error TS(2554): Expected 2 arguments, but got 1.
        gqlAgent('{ allPosts { id } }').expect({
            data: {
                allPosts: [{ id: '1' }, { id: '2' }, { id: '3' }],
            },
        }));
    // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('filters by string using the q filter in a case-insensitive way', () =>
        // @ts-expect-error TS(2554): Expected 2 arguments, but got 1.
        gqlAgent('{ allPosts(filter: { q: "lorem" }) { id } }').expect({
            data: {
                allPosts: [{ id: '1' }],
            },
        }));
    // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('gets an entity by id', () =>
        // @ts-expect-error TS(2554): Expected 2 arguments, but got 1.
        gqlAgent('{ Post(id: 1) { id } }').expect({
            data: {
                Post: { id: '1' },
            },
        }));
    // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('gets all the entity fields', () =>
        // @ts-expect-error TS(2554): Expected 2 arguments, but got 1.
        gqlAgent('{ Post(id: 1) { id title views user_id } }').expect({
            data: {
                Post: {
                    id: '1',
                    title: 'Lorem Ipsum',
                    views: 254,
                    user_id: '123',
                },
            },
        }));
    // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('throws an error when asked for a non existent field', () =>
        // @ts-expect-error TS(2554): Expected 2 arguments, but got 1.
        gqlAgent('{ Post(id: 1) { foo } }').expect({
            errors: [
                {
                    message: 'Cannot query field "foo" on type "Post".',
                    locations: [{ line: 1, column: 17 }],
                },
            ],
        }));
    // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('gets relationship fields', () =>
        // @ts-expect-error TS(2554): Expected 2 arguments, but got 1.
        gqlAgent('{ Post(id: 1) { User { name } Comments { body }} }').expect({
            data: {
                Post: {
                    User: { name: 'John Doe' },
                    Comments: [
                        { body: 'Consectetur adipiscing elit' },
                        { body: 'Nam molestie pellentesque dui' },
                    ],
                },
            },
        }));
    // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('allows multiple mutations', () =>
        // @ts-expect-error TS(2554): Expected 2 arguments, but got 1.
        gqlAgent(
            'mutation{ updatePost(id:"2", title:"Foo bar", views: 200, user_id:"123") { id } }'
        )
            .then(() =>
                // @ts-expect-error TS(2554): Expected 2 arguments, but got 1.
                gqlAgent(
                    'mutation{ updatePost(id:"2", title:"Foo bar", views: 200, user_id:"123") { id } }'
                )
            )
            // @ts-expect-error TS(2304): Cannot find name 'expect'.
            .then((res: any) => expect(res.body).toEqual({ data: { updatePost: { id: '2' } } })
            ));
});
