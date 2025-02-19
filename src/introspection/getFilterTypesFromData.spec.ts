import { expect, test } from 'vitest';
import getFilterTypesFromData from './getFilterTypesFromData';

const data = {
    posts: [
        {
            id: 1,
            title: 'Lorem Ipsum',
            views: 254,
            user_id: 123,
            published: true,
            published_at: '2021-01-01T00:00:00.000Z',
        },
        {
            id: 2,
            title: 'Sic Dolor amet',
            views: 65,
            user_id: 456,
            published: true,
            published_at: '2021-01-01T00:00:00.000Z',
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

/*
const PostType = new GraphQLObjectType({
    name: 'PostFilter',
    fields: {
        q: { type: GraphQLString },
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        views: { type: GraphQLInt },
        user_id: { type: GraphQLID },
        published: { type: GraphQLBoolean },
        published_at: { type: GraphQLScalarType },
    },
});
const UsersType = new GraphQLObjectType({
    name: 'UserFilter',
    fields: {
        q: { type: GraphQLString },
        id: { type: GraphQLID },
        name: { type: GraphQLString },
    },
});
*/

test('creates one filter type per entity', () => {
    const filterTypes = getFilterTypesFromData(data);
    expect(Object.values(filterTypes).map((type) => type.toString())).toEqual([
        'PostFilter',
        'UserFilter',
    ]);
});

test('creates one filter field per entity field', () => {
    const filterTypes = getFilterTypesFromData(data);
    const PostFilterFields = filterTypes.Post.getFields();
    expect(PostFilterFields.id.type.toString()).toEqual('ID');
    expect(PostFilterFields.title.type.toString()).toEqual('String');
    expect(PostFilterFields.views.type.toString()).toEqual('Int');
    expect(PostFilterFields.user_id.type.toString()).toEqual('ID');
    expect(PostFilterFields.published.type.toString()).toEqual('Boolean');
    expect(PostFilterFields.published_at.type.toString()).toEqual('Date');
    const CommentFilterFields = filterTypes.User.getFields();
    expect(CommentFilterFields.id.type.toString()).toEqual('ID');
    expect(CommentFilterFields.name.type.toString()).toEqual('String');
});

test('creates one q field per entity field', () => {
    const filterTypes = getFilterTypesFromData(data);
    const PostFilterFields = filterTypes.Post.getFields();
    expect(PostFilterFields.q.type.toString()).toEqual('String');
    const CommentFilterFields = filterTypes.User.getFields();
    expect(CommentFilterFields.q.type.toString()).toEqual('String');
});

test('creates 4 fields for number field for range filters', () => {
    const filterTypes = getFilterTypesFromData(data);
    const PostFilterFields = filterTypes.Post.getFields();
    expect(PostFilterFields.views_lt.type.toString()).toEqual('Int');
    expect(PostFilterFields.views_lte.type.toString()).toEqual('Int');
    expect(PostFilterFields.views_gt.type.toString()).toEqual('Int');
    expect(PostFilterFields.views_gte.type.toString()).toEqual('Int');
});

test('creates 4 fields for dates fields', () => {
    const filterTypes = getFilterTypesFromData(data);
    const PostFilterFields = filterTypes.Post.getFields();
    expect(PostFilterFields.published_at_lt.type.toString()).toEqual('Date');
    expect(PostFilterFields.published_at_lte.type.toString()).toEqual('Date');
    expect(PostFilterFields.published_at_gt.type.toString()).toEqual('Date');
    expect(PostFilterFields.published_at_gte.type.toString()).toEqual('Date');
});

test('does not create comparison fields for fields that do not support it', () => {
    const filterTypes = getFilterTypesFromData(data);
    const PostFilterFields = filterTypes.Post.getFields();
    expect(PostFilterFields.published_lte).toBeUndefined();
});
