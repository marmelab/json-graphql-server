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
            title: 'Sic Dolor amet',
            views: 65,
            user_id: 456,
        },
    ],
    users: [
        {
            id: 123,
            name: 'John Doe',
        },
        {
            id: 456,
            name: 'Jane Doe',
        },
    ],
};

let agent;

beforeAll(() => {
    const app = express();
    app.use('/', jsonGraphqlExpress(data));
    agent = request.agent(app);
});

const gqlAgent = (query, variables) =>
    agent.post('/').send({
        query,
        variables,
    });

describe('all* route', () => {
    it('returns all entities by default', () =>
        gqlAgent('{ allPosts { id } }').expect({
            data: {
                allPosts: [{ id: 1 }, { id: 2 }],
            },
        }));
    describe('pagination', () => {
        it('does not paginate when page is not set', () =>
            gqlAgent('{ allPosts(perPage: 1) { id } }').expect({
                data: {
                    allPosts: [{ id: 1 }, { id: 2 }],
                },
            }));
        it('uses page to set page number', () =>
            Promise.all([
                gqlAgent('{ allPosts(page: 0) { id } }').expect({
                    data: {
                        allPosts: [{ id: 1 }, { id: 2 }],
                    },
                }),
                gqlAgent('{ allPosts(page: 1) { id } }').expect({
                    data: {
                        allPosts: [],
                    },
                }),
            ]));
        it('uses perPage to set number of results per page', () =>
            Promise.all([
                gqlAgent('{ allPosts(page: 0, perPage: 1) { id } }').expect({
                    data: {
                        allPosts: [{ id: 1 }],
                    },
                }),
                gqlAgent('{ allPosts(page: 1, perPage: 1) { id } }').expect({
                    data: {
                        allPosts: [{ id: 2 }],
                    },
                }),
            ]));
    });
    describe('sort', () => {
        it('sorts data using sortField for the field', () =>
            Promise.all([
                gqlAgent('{ allPosts(sortField: "views") { id } }').expect({
                    data: {
                        allPosts: [{ id: 2 }, { id: 1 }],
                    },
                }),
                gqlAgent('{ allPosts(sortField: "title") { id } }').expect({
                    data: {
                        allPosts: [{ id: 1 }, { id: 2 }],
                    },
                }),
            ]));
        it('sorts data using sortOrder for the sort direction', () =>
            Promise.all([
                gqlAgent(
                    '{ allPosts(sortField: "views", sortOrder: "asc") { id } }',
                ).expect({
                    data: {
                        allPosts: [{ id: 2 }, { id: 1 }],
                    },
                }),
                gqlAgent(
                    '{ allPosts(sortField: "views", sortOrder: "desc") { id } }',
                ).expect({
                    data: {
                        allPosts: [{ id: 1 }, { id: 2 }],
                    },
                }),
            ]));
    });
    describe('filters', () => {
        it('filters by string on all text fields using the q filter', () =>
            gqlAgent('{ allPosts(filter: { q: "Lorem" }) { id } }').expect({
                data: {
                    allPosts: [{ id: 1 }],
                },
            }));
        it('filters by string using the q filter in a case-insensitive way', () =>
            gqlAgent('{ allPosts(filter: { q: "lorem" }) { id } }').expect({
                data: {
                    allPosts: [{ id: 1 }],
                },
            }));
        it('filters by value on each field using the related filter', () =>
            Promise.all([
                gqlAgent('{ allPosts(filter: { id: 2 }) { id } }').expect({
                    data: {
                        allPosts: [{ id: 2 }],
                    },
                }),
                gqlAgent(
                    '{ allPosts(filter: { title: "Sic Dolor amet" }) { id } }',
                ).expect({
                    data: {
                        allPosts: [{ id: 2 }],
                    },
                }),
                gqlAgent('{ allPosts(filter: { views: 65 }) { id } }').expect({
                    data: {
                        allPosts: [{ id: 2 }],
                    },
                }),
                gqlAgent(
                    '{ allPosts(filter: { user_id: 456 }) { id } }',
                ).expect({
                    data: {
                        allPosts: [{ id: 2 }],
                    },
                }),
            ]));
    });
});
