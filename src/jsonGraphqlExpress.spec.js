import express from 'express';
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

let agent;

beforeAll(() => {
    const app = express();
    app.use('/', jsonGraphqlExpress(data));
    agent = request(app);
});

const gqlAgent = (query, variables) =>
    agent.post('/').send({
        query,
        variables,
    });

describe('integration tests', () => {
    it('returns all entities by default', () =>
        gqlAgent('{ allPosts { id } }').expect({
            data: {
                allPosts: [{ id: '1' }, { id: '2' }, { id: '3' }],
            },
        }));
    it('filters by string using the q filter in a case-insensitive way', () =>
        gqlAgent('{ allPosts(filter: { q: "lorem" }) { id } }').expect({
            data: {
                allPosts: [{ id: '1' }],
            },
        }));
    it('gets an entity by id', () =>
        gqlAgent('{ Post(id: 1) { id } }').expect({
            data: {
                Post: { id: '1' },
            },
        }));
    it('gets all the entity fields', () =>
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
    it('throws an error when asked for a non existent field', () =>
        gqlAgent('{ Post(id: 1) { foo } }').expect({
            errors: [
                {
                    message: 'Cannot query field "foo" on type "Post".',
                    locations: [{ line: 1, column: 17 }],
                },
            ],
        }));
    it('gets relationship fields', () =>
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
    it('allows multiple mutations', () =>
        gqlAgent(
            'mutation{ updatePost(id:"2", title:"Foo bar", views: 200, user_id:"123") { id } }'
        )
            .then(() =>
                gqlAgent(
                    'mutation{ updatePost(id:"2", title:"Foo bar", views: 200, user_id:"123") { id } }'
                )
            )
            .then((res) =>
                expect(res.body).toEqual({ data: { updatePost: { id: '2' } } })
            ));
});
