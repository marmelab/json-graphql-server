import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
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

const PostType = new GraphQLObjectType({
    name: 'Post',
    fields: {
        id: { type: GraphQLString },
        title: { type: GraphQLString },
        views: { type: GraphQLString },
        user_id: { type: GraphQLString },
    },
});
const PostPageType = new GraphQLObjectType({
    name: 'PostPage',
    fields: {
        items: { type: new GraphQLList(PostType) },
        totalCount: { type: GraphQLInt },
    },
});
const UserType = new GraphQLObjectType({
    name: 'User',
    fields: {
        id: { type: GraphQLString },
        name: { type: GraphQLString },
    },
});
const UserPageType = new GraphQLObjectType({
    name: 'UserPage',
    fields: {
        items: { type: new GraphQLList(UserType) },
        totalCount: { type: GraphQLInt },
    },
});

const QueryType = new GraphQLObjectType({ // eslint-disable-line 
    name: 'Query',
    fields: {
        getPost: {
            type: PostType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLInt) },
            },
        },
        getPageOfPost: {
            type: PostPageType,
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
                id: { type: new GraphQLNonNull(GraphQLInt) },
            },
        },
        getPageOfUser: {
            type: UserPageType,
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

test('creates one type and one page type per data type', () => {
    const typeMap = getSchemaFromData(data).getTypeMap();
    expect(typeMap['Post'].name).toEqual(PostType.name);
    expect(typeMap['Post'].fields).toEqual(PostType.fields);
    expect(typeMap['PostPage'].name).toEqual(PostPageType.name);
    expect(typeMap['PostPage'].fields).toEqual(PostPageType.fields);
    expect(typeMap['User'].name).toEqual(UserType.name);
    expect(typeMap['User'].fields).toEqual(UserType.fields);
    expect(typeMap['UserPage'].name).toEqual(UserPageType.name);
    expect(typeMap['UserPage'].fields).toEqual(UserPageType.fields);
});

test('creates two query fields per data type', () => {
    const queries = getSchemaFromData(data).getQueryType().getFields();
    expect(queries['getPost'].type.name).toEqual(PostType.name);
    expect(queries['getPost'].args).toEqual([
        {
            defaultValue: undefined,
            description: null,
            name: 'id',
            type: new GraphQLNonNull(GraphQLInt),
        },
    ]);
    expect(queries['getPageOfPost'].type.name).toEqual(PostPageType.name);
    expect(queries['getPageOfPost'].args).toEqual([
        {
            defaultValue: undefined,
            description: null,
            name: 'page',
            type: GraphQLInt,
        },
        {
            defaultValue: undefined,
            description: null,
            name: 'perPage',
            type: GraphQLInt,
        },
        {
            defaultValue: undefined,
            description: null,
            name: 'sortField',
            type: GraphQLString,
        },
        {
            defaultValue: undefined,
            description: null,
            name: 'sortOrder',
            type: GraphQLString,
        },
        {
            defaultValue: undefined,
            description: null,
            name: 'filter',
            type: GraphQLString,
        },
    ]);
    expect(queries['getUser'].type.name).toEqual(UserType.name);
    expect(queries['getUser'].args).toEqual([
        {
            defaultValue: undefined,
            description: null,
            name: 'id',
            type: new GraphQLNonNull(GraphQLInt),
        },
    ]);
    expect(queries['getPageOfUser'].type.name).toEqual(UserPageType.name);
    expect(queries['getPageOfUser'].args).toEqual([
        {
            defaultValue: undefined,
            description: null,
            name: 'page',
            type: GraphQLInt,
        },
        {
            defaultValue: undefined,
            description: null,
            name: 'perPage',
            type: GraphQLInt,
        },
        {
            defaultValue: undefined,
            description: null,
            name: 'sortField',
            type: GraphQLString,
        },
        {
            defaultValue: undefined,
            description: null,
            name: 'sortOrder',
            type: GraphQLString,
        },
        {
            defaultValue: undefined,
            description: null,
            name: 'filter',
            type: GraphQLString,
        },
    ]);
});
