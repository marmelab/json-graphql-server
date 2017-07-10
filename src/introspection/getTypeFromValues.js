import {
    GraphQLBoolean,
    GraphQLFloat,
    GraphQLID,
    GraphQLInt,
    GraphQLNonNull,
    GraphQLString,
} from 'graphql';

const isNumeric = value => !isNaN(parseFloat(value)) && isFinite(value);
const valuesAreNumeric = values => values.every(isNumeric);
const isInteger = value => Number.isInteger(value);
const valuesAreInteger = values => values.every(isInteger);
const isBoolean = value => typeof value === 'boolean';
const valuesAreBoolean = values => values.every(isBoolean);

const requiredTypeOrNormal = (type, isRequired) =>
    isRequired ? new GraphQLNonNull(type) : type;

// FIXME obviously very weak
export default (name, values = [], isRequired = false) => {
    if (name === 'id' || name.substr(name.length - 3) === '_id') {
        return requiredTypeOrNormal(GraphQLID, isRequired);
    }
    if (values.length > 0) {
        if (valuesAreBoolean(values)) {
            return requiredTypeOrNormal(GraphQLBoolean, isRequired);
        }
        if (valuesAreInteger(values)) {
            return requiredTypeOrNormal(GraphQLInt, isRequired);
        }
        if (valuesAreNumeric(values)) {
            return requiredTypeOrNormal(GraphQLFloat, isRequired);
        }
    }
    return requiredTypeOrNormal(GraphQLString, isRequired);
};
