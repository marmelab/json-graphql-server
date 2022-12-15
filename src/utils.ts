import {
    GraphQLFieldConfigMap,
    GraphQLNamedType,
    GraphQLObjectType,
    GraphQLSchema,
    printSchema,
    Thunk,
} from 'graphql';

/**
 * Return a schema string with a Main type using the fields
 *
 * @param {*array} fields
 *
 * @example
 * printSchemaForFields({
 *     id: { type: graphql.GraphQLString },
 *     title: { type: graphql.GraphQLString },
 *     views: { type: graphql.GraphQLInt },
 *     user_id: { type: graphql.GraphQLString },
 * });
 * // type Main {
 * //   id: String
 * //   title: String
 * //   views: String
 * //   user_id: String
 * // }
 * //
 * // type Query {
 * //   foo: Main
 * // }
 */
export const printSchemaForFields = <TSource = unknown, TContext = unknown>(
    fields: Thunk<GraphQLFieldConfigMap<TSource, TContext>>
) => {
    const mainType = new GraphQLObjectType({
        name: 'Main',
        fields,
    });

    const queryType = new GraphQLObjectType({
        name: 'Query',
        fields: {
            foo: { type: mainType },
        },
    });

    const schema = new GraphQLSchema({ query: queryType });
    return printSchema(schema);
};

export const printSchemaForTypes = (types: GraphQLNamedType[]) => {
    const typesSchema = types.reduce((schema, type) => {
        schema[type.name] = type;
        return schema;
    }, {} as Record<string, GraphQLNamedType>);
    const queryType = new GraphQLObjectType({
        name: 'Query',
        fields: types.reduce((fields, type) => {
            fields[type.name] = { type };
            return fields;
        }, {} as GraphQLFieldConfigMap<unknown, unknown>),
    });

    const schema = new GraphQLSchema({ ...typesSchema, query: queryType });
    return printSchema(schema);
};
