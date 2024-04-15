import {
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLString,
} from 'graphql';
import getSchemaFromData from './getSchemaFromData';
import e from 'cors';

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

const PostType = new GraphQLObjectType({
    name: 'Post',
    fields: () => ({
        id: { type: new GraphQLNonNull(GraphQLID) },
        title: { type: new GraphQLNonNull(GraphQLString) },
        views: { type: new GraphQLNonNull(GraphQLInt) },
        user_id: { type: new GraphQLNonNull(GraphQLID) },
        User: { type: UserType },
    }),
});

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        Posts: { type: new GraphQLList(PostType) },
    }),
});

/*
const ListMetadataType = new GraphQLObjectType({
    name: 'ListMetadata',
    fields: {
        count: { type: GraphQLInt },
    },
});

const QueryType = new GraphQLObjectType({
    name: 'Query',
    fields: {
        getPost: {
            type: PostType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) },
            },
        },
        getPageOfPost: {
            type: new GraphQLList(PostType),
            args: {
                page: { type: GraphQLInt },
                perPage: { type: GraphQLInt },
                sortField: { type: GraphQLString },
                sortOrder: { type: GraphQLString },
                filter: { type: GraphQLString },
            },
        },
        getUser: {
            type: UserType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) },
            },
        },
        getPageOfUser: {
            type: new GraphQLList(UserType),
            args: {
                page: { type: GraphQLInt },
                perPage: { type: GraphQLInt },
                sortField: { type: GraphQLString },
                sortOrder: { type: GraphQLString },
                filter: { type: GraphQLString },
            },
        },
    },
});
*/

test('creates one type per data type', () => {
    const typeMap = getSchemaFromData(data).getTypeMap();
    expect(typeMap['Post'].name).toEqual(PostType.name);
    expect(Object.keys(typeMap['Post'].getFields())).toEqual(
        Object.keys(PostType.getFields())
    );
    expect(typeMap['User'].name).toEqual(UserType.name);
    expect(Object.keys(typeMap['User'].getFields())).toEqual(
        Object.keys(UserType.getFields())
    );
});

test('creates one field per relationship', () => {
    const typeMap = getSchemaFromData(data).getTypeMap();
    expect(Object.keys(typeMap['Post'].getFields())).toContain('User');
});

test('creates one field per reverse relationship', () => {
    const typeMap = getSchemaFromData(data).getTypeMap();
    expect(Object.keys(typeMap['User'].getFields())).toContain('Posts');
});

test('creates three query fields per data type', () => {
    const queries = getSchemaFromData(data).getQueryType().getFields();
    expect(queries['Post'].type.name).toEqual(PostType.name);
    expect(queries['Post'].args).toEqual([
        expect.objectContaining({
            name: 'id',
            type: new GraphQLNonNull(GraphQLID),
        }),
    ]);
    expect(queries['allPosts'].type.toString()).toEqual('[Post]');
    expect(queries['allPosts'].args[0].name).toEqual('page');
    expect(queries['allPosts'].args[0].type).toEqual(GraphQLInt);
    expect(queries['allPosts'].args[1].name).toEqual('perPage');
    expect(queries['allPosts'].args[1].type).toEqual(GraphQLInt);
    expect(queries['allPosts'].args[2].name).toEqual('sortField');
    expect(queries['allPosts'].args[2].type).toEqual(GraphQLString);
    expect(queries['allPosts'].args[3].name).toEqual('sortOrder');
    expect(queries['allPosts'].args[3].type).toEqual(GraphQLString);
    expect(queries['allPosts'].args[4].name).toEqual('filter');
    expect(queries['allPosts'].args[4].type.toString()).toEqual('PostFilter');
    expect(queries['_allPostsMeta'].type.toString()).toEqual('ListMetadata');

    expect(queries['User'].type.name).toEqual(UserType.name);
    expect(queries['User'].args).toEqual([
        expect.objectContaining({
            name: 'id',
            type: new GraphQLNonNull(GraphQLID),
        }),
    ]);
    expect(queries['allUsers'].type.toString()).toEqual('[User]');
    expect(queries['allUsers'].args[0].name).toEqual('page');
    expect(queries['allUsers'].args[0].type).toEqual(GraphQLInt);
    expect(queries['allUsers'].args[1].name).toEqual('perPage');
    expect(queries['allUsers'].args[1].type).toEqual(GraphQLInt);
    expect(queries['allUsers'].args[2].name).toEqual('sortField');
    expect(queries['allUsers'].args[2].type).toEqual(GraphQLString);
    expect(queries['allUsers'].args[3].name).toEqual('sortOrder');
    expect(queries['allUsers'].args[3].type).toEqual(GraphQLString);
    expect(queries['allUsers'].args[4].name).toEqual('filter');
    expect(queries['allUsers'].args[4].type.toString()).toEqual('UserFilter');
    expect(queries['_allPostsMeta'].type.toString()).toEqual('ListMetadata');
});

test('creates three mutation fields per data type', () => {
    const mutations = getSchemaFromData(data).getMutationType().getFields();
    expect(mutations['createPost'].type.name).toEqual(PostType.name);
    expect(mutations['createPost'].args).toEqual([
        expect.objectContaining({
            name: 'title',
            type: new GraphQLNonNull(GraphQLString),
        }),
       expect.objectContaining({
            name: 'views',
            type: new GraphQLNonNull(GraphQLInt),
        }),
        expect.objectContaining({
            name: 'user_id',
            type: new GraphQLNonNull(GraphQLID),
        }),
    ]);
    expect(mutations['updatePost'].type.name).toEqual(PostType.name);
    expect(mutations['updatePost'].args).toEqual([
        expect.objectContaining({
            name: 'id',
            type: new GraphQLNonNull(GraphQLID),
        }),
        expect.objectContaining({
            name: 'title',
            type: GraphQLString,
        }),
        expect.objectContaining({
            name: 'views',
            type: GraphQLInt,
        }),
        expect.objectContaining({
            name: 'user_id',
            type: GraphQLID,
         }),
    ]);
    expect(mutations['removePost'].type.name).toEqual(PostType.name);
    expect(mutations['removePost'].args).toEqual([
        expect.objectContaining({
            name: 'id',
            type: new GraphQLNonNull(GraphQLID),
        }),
    ]);
    expect(mutations['createUser'].type.name).toEqual(UserType.name);
    expect(mutations['createUser'].args).toEqual([
        expect.objectContaining({
            name: 'name',
            type: new GraphQLNonNull(GraphQLString),
        }),
    ]);
    expect(mutations['updateUser'].type.name).toEqual(UserType.name);
    expect(mutations['updateUser'].args).toEqual([
        expect.objectContaining({
            name: 'id',
            type: new GraphQLNonNull(GraphQLID),
        }),
        expect.objectContaining({
            name: 'name',
            type: GraphQLString,
        }),
    ]);
    expect(mutations['removeUser'].type.name).toEqual(UserType.name);
    expect(mutations['removeUser'].args).toEqual([
        expect.objectContaining({
            name: 'id',
            type: new GraphQLNonNull(GraphQLID),
        }),
    ]);
});

test('creates the mutation *Input type for createMany', () => {
    const mutations = getSchemaFromData(data).getMutationType().getFields();
    const createManyPostInputType = mutations['createManyPost'].args[0].type;
    expect(createManyPostInputType.toString()).toEqual('[PostInput]');
    expect(createManyPostInputType.ofType.getFields()).toEqual({
        title: expect.objectContaining({
            type: new GraphQLNonNull(GraphQLString),
            name: 'title',
        }),
        views: expect.objectContaining({
            type: new GraphQLNonNull(GraphQLInt),
            name: 'views',
        }),
        user_id: expect.objectContaining({
            type: new GraphQLNonNull(GraphQLID),
            name: 'user_id',
        }),
    });
});

test('pluralizes and capitalizes correctly', () => {
    const data = {
        feet: [
            { id: 1, size: 42 },
            { id: 2, size: 39 },
        ],
        categories: [{ id: 1, name: 'foo' }],
    };
    const queries = getSchemaFromData(data).getQueryType().getFields();
    expect(queries).toHaveProperty('Foot');
    expect(queries).toHaveProperty('Category');
    expect(queries).toHaveProperty('allFeet');
    expect(queries).toHaveProperty('allCategories');
    const types = getSchemaFromData(data).getTypeMap();
    expect(types).toHaveProperty('Foot');
    expect(types).toHaveProperty('Category');
});
