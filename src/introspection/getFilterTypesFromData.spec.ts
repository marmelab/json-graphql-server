import getFilterTypesFromData from './getFilterTypesFromData';

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

/*
const PostType = new GraphQLObjectType({
    name: 'PostFilter',
    fields: {
        q: { type: GraphQLString },
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        views: { type: GraphQLInt },
        user_id: { type: GraphQLID },
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

test('does not create vomparison fiels for non-number fields', () => {
    const filterTypes = getFilterTypesFromData(data);
    const PostFilterFields = filterTypes.Post.getFields();
    expect(PostFilterFields.title_lte).toBeUndefined();
});
