import { GraphQLScalarType, GraphQLError } from 'graphql';
import { Kind } from 'graphql/language';
import getFilterTypesFromData from './getFilterTypesFromData';

export const hasDateType = data =>
    Object.values(getFilterTypesFromData(data)).reduce((hasDate, type) => {
        if (hasDate) return true;
        return Object.values(type.getFields()).reduce((hasDateField, field) => {
            if (hasDateField) return true;
            return field.type.name == 'Date';
        }, false);
    }, false);

export default new GraphQLScalarType({
    name: 'Date',
    description: 'Date type',
    parseValue(value) {
        // value comes from the client
        return new Date(value); // sent to resolvers
    },
    serialize(value) {
        // value comes from resolvers
        return value.toISOString(); // sent to the client
    },
    parseLiteral(ast) {
        // ast comes from parsing the query
        // this is where you can validate and transform
        if (ast.kind !== Kind.STRING) {
            throw new GraphQLError(
                `Query error: Can only parse dates strings, got a: ${ast.kind}`,
                [ast],
            );
        }
        if (isNaN(Date.parse(ast.value))) {
            throw new GraphQLError(`Query error: not a valid date`, [ast]);
        }
        return new Date(ast.value);
    },
});
