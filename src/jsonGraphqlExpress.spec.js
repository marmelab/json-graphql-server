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
    users: [{ id: 123, name: 'John Doe' }, { id: 456, name: 'Jane Doe' }],
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
                allPosts: [{ id: 1 }, { id: 2 }, { id: 3 }],
            },
        }));
    describe('pagination', () => {
        it('does not paginate when page is not set', () =>
            gqlAgent('{ allPosts(perPage: 1) { id } }').expect({
                data: {
                    allPosts: [{ id: 1 }, { id: 2 }, { id: 3 }],
                },
            }));
        it('uses page to set page number', () =>
            Promise.all([
                gqlAgent('{ allPosts(page: 0) { id } }').expect({
                    data: {
                        allPosts: [{ id: 1 }, { id: 2 }, { id: 3 }],
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
                gqlAgent('{ allPosts(page: 2, perPage: 1) { id } }').expect({
                    data: {
                        allPosts: [{ id: 3 }],
                    },
                }),
                gqlAgent('{ allPosts(page: 3, perPage: 1) { id } }').expect({
                    data: {
                        allPosts: [],
                    },
                }),
                gqlAgent('{ allPosts(page: 0, perPage: 2) { id } }').expect({
                    data: {
                        allPosts: [{ id: 1 }, { id: 2 }],
                    },
                }),
                gqlAgent('{ allPosts(page: 1, perPage: 2) { id } }').expect({
                    data: {
                        allPosts: [{ id: 3 }],
                    },
                }),
                gqlAgent('{ allPosts(page: 2, perPage: 2) { id } }').expect({
                    data: {
                        allPosts: [],
                    },
                }),
            ]));
    });
    describe('sort', () => {
        it('sorts data using sortField for the field', () =>
            Promise.all([
                gqlAgent('{ allPosts(sortField: "views") { id } }').expect({
                    data: {
                        allPosts: [{ id: 2 }, { id: 3 }, { id: 1 }],
                    },
                }),
                gqlAgent('{ allPosts(sortField: "title") { id } }').expect({
                    data: {
                        allPosts: [{ id: 1 }, { id: 3 }, { id: 2 }],
                    },
                }),
            ]));
        it('sorts data using sortOrder for the sort direction', () =>
            Promise.all([
                gqlAgent(
                    '{ allPosts(sortField: "views", sortOrder: "asc") { id } }',
                ).expect({
                    data: {
                        allPosts: [{ id: 2 }, { id: 3 }, { id: 1 }],
                    },
                }),
                gqlAgent(
                    '{ allPosts(sortField: "views", sortOrder: "desc") { id } }',
                ).expect({
                    data: {
                        allPosts: [{ id: 1 }, { id: 3 }, { id: 2 }],
                    },
                }),
            ]));
    });
    describe('filter', () => {
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
                        allPosts: [{ id: 3 }],
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
        it('filters by value range on each integer field using the related filters', () =>
            Promise.all([
                gqlAgent(
                    '{ allPosts(filter: { views_lt: 76 }) { id } }',
                ).expect({
                    data: {
                        allPosts: [{ id: 2 }],
                    },
                }),
                gqlAgent(
                    '{ allPosts(filter: { views_lte: 76 }) { id } }',
                ).expect({
                    data: {
                        allPosts: [{ id: 2 }, { id: 3 }],
                    },
                }),
                gqlAgent(
                    '{ allPosts(filter: { views_gt: 76 }) { id } }',
                ).expect({
                    data: {
                        allPosts: [{ id: 1 }],
                    },
                }),
                gqlAgent(
                    '{ allPosts(filter: { views_gte: 76 }) { id } }',
                ).expect({
                    data: {
                        allPosts: [{ id: 1 }, { id: 3 }],
                    },
                }),
            ]));
    });
});

describe('Entity route', () => {
    it('gets an entity by id', () =>
        Promise.all([
            gqlAgent('{ Post(id: 1) { id } }').expect({
                data: {
                    Post: { id: 1 },
                },
            }),
            gqlAgent('{ Post(id: 2) { id } }').expect({
                data: {
                    Post: { id: 2 },
                },
            }),
        ]));
    it('gets all the entity fields', () =>
        gqlAgent('{ Post(id: 1) { id title views user_id } }').expect({
            data: {
                Post: { id: 1, title: 'Lorem Ipsum', views: 254, user_id: 123 },
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
    it('gets one to many relationship fields', () =>
        gqlAgent('{ Post(id: 1) { User { name } } }').expect({
            data: {
                Post: { User: { name: 'John Doe' } },
            },
        }));
    it('gets many to one relationship fields', () =>
        Promise.all([
            gqlAgent('{ Post(id: 1) { Comments { body } } }').expect({
                data: {
                    Post: {
                        Comments: [
                            { body: 'Consectetur adipiscing elit' },
                            { body: 'Nam molestie pellentesque dui' },
                        ],
                    },
                },
            }),
            gqlAgent('{ Post(id: 2) { Comments { body } } }').expect({
                data: {
                    Post: {
                        Comments: [{ body: 'Sunt in culpa qui officia' }],
                    },
                },
            }),
        ]));
});
