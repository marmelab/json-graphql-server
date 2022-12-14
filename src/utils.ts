import { printSchema, GraphQLSchema, GraphQLObjectType } from 'graphql';

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
export const printSchemaForFields = (fields: any) => {
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

export const printSchemaForTypes = (types: any) => {
    const typesSchema = types.reduce((schema: any, type: any) => {
        schema[type.name] = type;
        return schema;
    }, {});
    const queryType = new GraphQLObjectType({
        name: 'Query',
        fields: types.reduce((fields: any, type: any) => {
            fields[type.name] = { type };
            return fields;
        }, {}),
    });

    const schema = new GraphQLSchema({ ...typesSchema, query: queryType });
    return printSchema(schema);
};
