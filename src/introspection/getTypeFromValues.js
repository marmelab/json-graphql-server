import {
    GraphQLBoolean,
    GraphQLFloat,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLString,
} from 'graphql';
import GraphQLJSON from 'graphql-type-json';
import DateType from './DateType';

const isNumeric = (value) => !isNaN(parseFloat(value)) && isFinite(value);
const valuesAreNumeric = (values) => values.every(isNumeric);
const isInteger = (value) => Number.isInteger(value);
const valuesAreInteger = (values) => values.every(isInteger);
const isBoolean = (value) => typeof value === 'boolean';
const valuesAreBoolean = (values) => values.every(isBoolean);
const isString = (value) => typeof value === 'string';
const valuesAreString = (values) => values.every(isString);
const isArray = (value) => Array.isArray(value);
const valuesAreArray = (values) => values.every(isArray);
const isDate = (value) => value instanceof Date;
const valuesAreDate = (values) => values.every(isDate);
const isObject = (value) =>
    Object.prototype.toString.call(value) === '[object Object]';
const valuesAreObject = (values) => values.every(isObject);

const requiredTypeOrNormal = (type, isRequired) =>
    isRequired ? new GraphQLNonNull(type) : type;

export default (name, values = [], isRequired = false) => {
    if (name === 'id' || name.substr(name.length - 3) === '_id') {
        return requiredTypeOrNormal(GraphQLID, isRequired);
    }
    if (values.length > 0) {
        if (valuesAreArray(values)) {
            const leafValues = values.reduce((agg, arr) => {
                arr.forEach((value) => agg.push(value));
                return agg;
            }, []);
            if (valuesAreBoolean(leafValues)) {
                return requiredTypeOrNormal(
                    new GraphQLList(GraphQLBoolean),
                    isRequired
                );
            }
            if (valuesAreString(leafValues)) {
                return requiredTypeOrNormal(
                    new GraphQLList(GraphQLString),
                    isRequired
                );
            }
            if (valuesAreInteger(leafValues)) {
                return requiredTypeOrNormal(
                    new GraphQLList(GraphQLInt),
                    isRequired
                );
            }
            if (valuesAreNumeric(leafValues)) {
                return requiredTypeOrNormal(
                    new GraphQLList(GraphQLFloat),
                    isRequired
                );
            }
            if (valuesAreObject(leafValues)) {
                return requiredTypeOrNormal(GraphQLJSON, isRequired);
            }
            return requiredTypeOrNormal(
                new GraphQLList(GraphQLString),
                isRequired
            ); // FIXME introspect further
        }
        if (valuesAreBoolean(values)) {
            return requiredTypeOrNormal(GraphQLBoolean, isRequired);
        }
        if (valuesAreDate(values)) {
            return requiredTypeOrNormal(DateType, isRequired);
        }
        if (valuesAreString(values)) {
            return requiredTypeOrNormal(GraphQLString, isRequired);
        }
        if (valuesAreInteger(values)) {
            return requiredTypeOrNormal(GraphQLInt, isRequired);
        }
        if (valuesAreNumeric(values)) {
            return requiredTypeOrNormal(GraphQLFloat, isRequired);
        }
        if (valuesAreObject(values)) {
            return requiredTypeOrNormal(GraphQLJSON, isRequired);
        }
    }
    return requiredTypeOrNormal(GraphQLString, isRequired); // FIXME introspect further
};
