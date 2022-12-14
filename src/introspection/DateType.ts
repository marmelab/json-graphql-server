import { GraphQLScalarType, GraphQLError } from 'graphql';
import { Kind } from 'graphql/language';

const ISO_DATE_STRING_PATTERN = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/;

export const isISODateString = (value) => {
    if (typeof value !== 'string') return false;
    if (!ISO_DATE_STRING_PATTERN.test(value)) return false;
    const d = new Date(value);
    return d.toISOString() === value;
};

export default new GraphQLScalarType({
    name: 'Date',
    description: 'Date type',
    parseValue(value) {
        // value comes from the client
        return new Date(value); // sent to resolvers
    },
    serialize(value) {
        // value comes from resolvers
        if (isISODateString(value)) return value;
        return value.toISOString(); // sent to the client
    },
    parseLiteral(ast) {
        // ast comes from parsing the query
        // this is where you can validate and transform
        if (ast.kind !== Kind.STRING) {
            throw new GraphQLError(
                `Query error: Can only parse dates strings, got a: ${ast.kind}`,
                [ast]
            );
        }
        if (isNaN(Date.parse(ast.value))) {
            throw new GraphQLError(`Query error: not a valid date`, [ast]);
        }
        return new Date(ast.value);
    },
});
