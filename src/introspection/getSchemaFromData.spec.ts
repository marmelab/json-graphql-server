import {
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLString,
} from 'graphql';
import getSchemaFromData from './getSchemaFromData';

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

// @ts-expect-error TS(7022): 'PostType' implicitly has type 'any' because it do... Remove this comment to see the full error message
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

// @ts-expect-error TS(7022): 'UserType' implicitly has type 'any' because it do... Remove this comment to see the full error message
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

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('creates one type per data type', () => {
    const typeMap = getSchemaFromData(data).getTypeMap();
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(typeMap['Post'].name).toEqual(PostType.name);
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(Object.keys(typeMap['Post'].getFields())).toEqual(
        Object.keys(PostType.getFields())
    );
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(typeMap['User'].name).toEqual(UserType.name);
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(Object.keys(typeMap['User'].getFields())).toEqual(
        Object.keys(UserType.getFields())
    );
});

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('creates one field per relationship', () => {
    const typeMap = getSchemaFromData(data).getTypeMap();
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(Object.keys(typeMap['Post'].getFields())).toContain('User');
});

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('creates one field per reverse relationship', () => {
    const typeMap = getSchemaFromData(data).getTypeMap();
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(Object.keys(typeMap['User'].getFields())).toContain('Posts');
});

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('creates three query fields per data type', () => {
    // @ts-expect-error TS(2533): Object is possibly 'null' or 'undefined'.
    const queries = getSchemaFromData(data).getQueryType().getFields();
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(queries['Post'].type.name).toEqual(PostType.name);
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(queries['Post'].args).toEqual([
        {
            defaultValue: undefined,
            description: null,
            name: 'id',
            type: new GraphQLNonNull(GraphQLID),
        },
    ]);
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(queries['allPosts'].type.toString()).toEqual('[Post]');
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(queries['allPosts'].args[0].name).toEqual('page');
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(queries['allPosts'].args[0].type).toEqual(GraphQLInt);
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(queries['allPosts'].args[1].name).toEqual('perPage');
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(queries['allPosts'].args[1].type).toEqual(GraphQLInt);
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(queries['allPosts'].args[2].name).toEqual('sortField');
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(queries['allPosts'].args[2].type).toEqual(GraphQLString);
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(queries['allPosts'].args[3].name).toEqual('sortOrder');
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(queries['allPosts'].args[3].type).toEqual(GraphQLString);
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(queries['allPosts'].args[4].name).toEqual('filter');
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(queries['allPosts'].args[4].type.toString()).toEqual('PostFilter');
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(queries['_allPostsMeta'].type.toString()).toEqual('ListMetadata');

    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(queries['User'].type.name).toEqual(UserType.name);
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(queries['User'].args).toEqual([
        {
            defaultValue: undefined,
            description: null,
            name: 'id',
            type: new GraphQLNonNull(GraphQLID),
        },
    ]);
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(queries['allUsers'].type.toString()).toEqual('[User]');
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(queries['allUsers'].args[0].name).toEqual('page');
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(queries['allUsers'].args[0].type).toEqual(GraphQLInt);
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(queries['allUsers'].args[1].name).toEqual('perPage');
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(queries['allUsers'].args[1].type).toEqual(GraphQLInt);
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(queries['allUsers'].args[2].name).toEqual('sortField');
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(queries['allUsers'].args[2].type).toEqual(GraphQLString);
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(queries['allUsers'].args[3].name).toEqual('sortOrder');
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(queries['allUsers'].args[3].type).toEqual(GraphQLString);
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(queries['allUsers'].args[4].name).toEqual('filter');
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(queries['allUsers'].args[4].type.toString()).toEqual('UserFilter');
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(queries['_allPostsMeta'].type.toString()).toEqual('ListMetadata');
});

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('creates three mutation fields per data type', () => {
    // @ts-expect-error TS(2533): Object is possibly 'null' or 'undefined'.
    const mutations = getSchemaFromData(data).getMutationType().getFields();
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(mutations['createPost'].type.name).toEqual(PostType.name);
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(mutations['createPost'].args).toEqual([
        {
            name: 'title',
            type: new GraphQLNonNull(GraphQLString),
            defaultValue: undefined,
            description: null,
        },
        {
            name: 'views',
            type: new GraphQLNonNull(GraphQLInt),
            defaultValue: undefined,
            description: null,
        },
        {
            name: 'user_id',
            type: new GraphQLNonNull(GraphQLID),
            defaultValue: undefined,
            description: null,
        },
    ]);
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(mutations['updatePost'].type.name).toEqual(PostType.name);
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(mutations['updatePost'].args).toEqual([
        {
            name: 'id',
            type: new GraphQLNonNull(GraphQLID),
            defaultValue: undefined,
            description: null,
        },
        {
            name: 'title',
            type: GraphQLString,
            defaultValue: undefined,
            description: null,
        },
        {
            name: 'views',
            type: GraphQLInt,
            defaultValue: undefined,
            description: null,
        },
        {
            name: 'user_id',
            type: GraphQLID,
            defaultValue: undefined,
            description: null,
        },
    ]);
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(mutations['removePost'].type.name).toEqual(PostType.name);
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(mutations['removePost'].args).toEqual([
        {
            name: 'id',
            type: new GraphQLNonNull(GraphQLID),
            defaultValue: undefined,
            description: null,
        },
    ]);
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(mutations['createUser'].type.name).toEqual(UserType.name);
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(mutations['createUser'].args).toEqual([
        {
            name: 'name',
            type: new GraphQLNonNull(GraphQLString),
            defaultValue: undefined,
            description: null,
        },
    ]);
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(mutations['updateUser'].type.name).toEqual(UserType.name);
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(mutations['updateUser'].args).toEqual([
        {
            name: 'id',
            type: new GraphQLNonNull(GraphQLID),
            defaultValue: undefined,
            description: null,
        },
        {
            name: 'name',
            type: GraphQLString,
            defaultValue: undefined,
            description: null,
        },
    ]);
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(mutations['removeUser'].type.name).toEqual(UserType.name);
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(mutations['removeUser'].args).toEqual([
        {
            defaultValue: undefined,
            description: null,
            name: 'id',
            type: new GraphQLNonNull(GraphQLID),
        },
    ]);
});

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('creates the mutation *Input type for createMany', () => {
    // @ts-expect-error TS(2533): Object is possibly 'null' or 'undefined'.
    const mutations = getSchemaFromData(data).getMutationType().getFields();
    const createManyPostInputType = mutations['createManyPost'].args[0].type;
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(createManyPostInputType.toString()).toEqual('[PostInput]');
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(createManyPostInputType.ofType.getFields()).toEqual({
        title: {
            type: new GraphQLNonNull(GraphQLString),
            name: 'title',
            astNode: undefined,
            defaultValue: undefined,
            description: undefined,
            extensions: undefined,
        },
        views: {
            type: new GraphQLNonNull(GraphQLInt),
            name: 'views',
            astNode: undefined,
            defaultValue: undefined,
            description: undefined,
            extensions: undefined,
        },
        user_id: {
            type: new GraphQLNonNull(GraphQLID),
            name: 'user_id',
            astNode: undefined,
            defaultValue: undefined,
            description: undefined,
            extensions: undefined,
        },
    });
});

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test('pluralizes and capitalizes correctly', () => {
    const data = {
        feet: [
            { id: 1, size: 42 },
            { id: 2, size: 39 },
        ],
        categories: [{ id: 1, name: 'foo' }],
    };
    // @ts-expect-error TS(2533): Object is possibly 'null' or 'undefined'.
    const queries = getSchemaFromData(data).getQueryType().getFields();
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(queries).toHaveProperty('Foot');
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(queries).toHaveProperty('Category');
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(queries).toHaveProperty('allFeet');
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(queries).toHaveProperty('allCategories');
    const types = getSchemaFromData(data).getTypeMap();
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(types).toHaveProperty('Foot');
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(types).toHaveProperty('Category');
});
