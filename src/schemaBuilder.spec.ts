import { graphql, GraphQLError } from 'graphql';
import schemaBuilder from './schemaBuilder';

test('plugs resolvers with schema', () => {
    const schema = schemaBuilder({
        posts: [{ id: 0, title: 'hello', foo: 'bar' }],
    });
    return graphql(schema, 'query { Post(id: 0) { id title } }').then(
        (result) =>
            expect(result).toEqual({
                data: { Post: { id: '0', title: 'hello' } },
            })
    );
});

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

const schema = schemaBuilder(data);

test('all* route returns all entities by default', () =>
    graphql(schema, '{ allPosts { id } }').then((result) =>
        expect(result).toEqual({
            data: {
                allPosts: [{ id: '1' }, { id: '2' }, { id: '3' }],
            },
        })
    ));
test('all* route supports pagination', () =>
    graphql(schema, '{ allPosts(page: 0, perPage: 2) { id } }').then((result) =>
        expect(result).toEqual({
            data: {
                allPosts: [{ id: '1' }, { id: '2' }],
            },
        })
    ));
test('all* route supports sorting', () =>
    graphql(
        schema,
        '{ allPosts(sortField: "views", sortOrder: "desc") { id } }'
    ).then((result) =>
        expect(result).toEqual({
            data: {
                allPosts: [{ id: '1' }, { id: '3' }, { id: '2' }],
            },
        })
    ));
test('all* route supports filtering', () =>
    graphql(schema, '{ allPosts(filter: { q: "lorem"}) { id } }').then(
        (result) =>
            expect(result).toEqual({
                data: {
                    allPosts: [{ id: '1' }],
                },
            })
    ));
test('entity route returns a single entity', () =>
    graphql(schema, '{ Post(id: 2) { id } }').then((result) =>
        expect(result).toEqual({
            data: {
                Post: { id: '2' },
            },
        })
    ));
test('entity route gets all the entity fields', () =>
    graphql(schema, '{ Post(id: 1) { id title views user_id } }').then(
        (result) =>
            expect(result).toEqual({
                data: {
                    Post: {
                        id: '1',
                        title: 'Lorem Ipsum',
                        user_id: '123',
                        views: 254,
                    },
                },
            })
    ));
test('entity route get many to one relationships fields', () =>
    graphql(schema, '{ Post(id: 1) { User { name } } }').then((result) =>
        expect(result).toEqual({
            data: { Post: { User: { name: 'John Doe' } } },
        })
    ));
test('entity route get one to many relationships fields', () =>
    graphql(schema, '{ Post(id: 1) { Comments { body } } }').then((result) =>
        expect(result).toEqual({
            data: {
                Post: {
                    Comments: [
                        { body: 'Consectetur adipiscing elit' },
                        { body: 'Nam molestie pellentesque dui' },
                    ],
                },
            },
        })
    ));
test('returns an error when asked for a non existent field', () =>
    graphql(schema, '{ Post(id: 1) { foo } }').then((result) =>
        expect(result).toEqual({
            errors: [
                new GraphQLError('Cannot query field "foo" on type "Post".'),
            ],
        })
    ));
