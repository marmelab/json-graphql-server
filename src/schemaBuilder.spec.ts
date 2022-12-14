import { graphql, GraphQLError } from 'graphql';
import schemaBuilder from './schemaBuilder';

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('plugs resolvers with schema', () => {
    const schema = schemaBuilder({
        posts: [{ id: 0, title: 'hello', foo: 'bar' }],
    });
    // @ts-expect-error TS(2554): Expected 1 arguments, but got 2.
    return graphql(schema, 'query { Post(id: 0) { id title } }').then(
        (result) =>
            // @ts-expect-error TS(2304): Cannot find name 'expect'.
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

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('all* route returns all entities by default', () =>
    // @ts-expect-error TS(2554): Expected 1 arguments, but got 2.
    graphql(schema, '{ allPosts { id } }').then((result) =>
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(result).toEqual({
            data: {
                allPosts: [{ id: '1' }, { id: '2' }, { id: '3' }],
            },
        })
    ));
// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('all* route supports pagination', () =>
    // @ts-expect-error TS(2554): Expected 1 arguments, but got 2.
    graphql(schema, '{ allPosts(page: 0, perPage: 2) { id } }').then((result) =>
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(result).toEqual({
            data: {
                allPosts: [{ id: '1' }, { id: '2' }],
            },
        })
    ));
// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('all* route supports sorting', () =>
    graphql(
        schema,
        // @ts-expect-error TS(2554): Expected 1 arguments, but got 2.
        '{ allPosts(sortField: "views", sortOrder: "desc") { id } }'
    ).then((result) =>
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(result).toEqual({
            data: {
                allPosts: [{ id: '1' }, { id: '3' }, { id: '2' }],
            },
        })
    ));
// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('all* route supports filtering', () =>
    // @ts-expect-error TS(2554): Expected 1 arguments, but got 2.
    graphql(schema, '{ allPosts(filter: { q: "lorem"}) { id } }').then(
        (result) =>
            // @ts-expect-error TS(2304): Cannot find name 'expect'.
            expect(result).toEqual({
                data: {
                    allPosts: [{ id: '1' }],
                },
            })
    ));
// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('entity route returns a single entity', () =>
    // @ts-expect-error TS(2554): Expected 1 arguments, but got 2.
    graphql(schema, '{ Post(id: 2) { id } }').then((result) =>
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(result).toEqual({
            data: {
                Post: { id: '2' },
            },
        })
    ));
// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('entity route gets all the entity fields', () =>
    // @ts-expect-error TS(2554): Expected 1 arguments, but got 2.
    graphql(schema, '{ Post(id: 1) { id title views user_id } }').then(
        (result) =>
            // @ts-expect-error TS(2304): Cannot find name 'expect'.
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
// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('entity route get many to one relationships fields', () =>
    // @ts-expect-error TS(2554): Expected 1 arguments, but got 2.
    graphql(schema, '{ Post(id: 1) { User { name } } }').then((result) =>
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(result).toEqual({
            data: { Post: { User: { name: 'John Doe' } } },
        })
    ));
// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('entity route get one to many relationships fields', () =>
    // @ts-expect-error TS(2554): Expected 1 arguments, but got 2.
    graphql(schema, '{ Post(id: 1) { Comments { body } } }').then((result) =>
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
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
// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('returns an error when asked for a non existent field', () =>
    // @ts-expect-error TS(2554): Expected 1 arguments, but got 2.
    graphql(schema, '{ Post(id: 1) { foo } }').then((result) =>
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(result).toEqual({
            errors: [
                new GraphQLError('Cannot query field "foo" on type "Post".'),
            ],
        })
    ));
