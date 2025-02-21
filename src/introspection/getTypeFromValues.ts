import {
    GraphQLBoolean,
    GraphQLFloat,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    type GraphQLNullableType,
    GraphQLString,
} from 'graphql';
import { GraphQLJSON } from 'graphql-type-json';
import DateType, { isISODateString } from './DateType';

const isNumeric = (value: any) =>
    !Number.isNaN(Number.parseFloat(value)) && Number.isFinite(value);
const valuesAreNumeric = (values: any[]) => values.every(isNumeric);
const isInteger = (value: any) => Number.isInteger(value);
const valuesAreInteger = (values: any[]) => values.every(isInteger);
const isBoolean = (value: any) => typeof value === 'boolean';
const valuesAreBoolean = (values: any[]) => values.every(isBoolean);
const isString = (value: any) => typeof value === 'string';
const valuesAreString = (values: any[]) => values.every(isString);
const isArray = (value: any) => Array.isArray(value);
const valuesAreArray = (values: any[]) => values.every(isArray);
const isDate = (value: any) => value instanceof Date || isISODateString(value);
const valuesAreDate = (values: any[]) => values.every(isDate);
const isObject = (value: any) =>
    Object.prototype.toString.call(value) === '[object Object]';
const valuesAreObject = (values: any[]) => values.every(isObject);

const requiredTypeOrNormal = <GQLType extends GraphQLNullableType>(
    type: GQLType,
    isRequired: boolean,
) => (isRequired ? new GraphQLNonNull(type) : type);

export default (name: string, values: any[] = [], isRequired = false) => {
    if (name === 'id' || name.substr(name.length - 3) === '_id') {
        return requiredTypeOrNormal(GraphQLID, isRequired);
    }
    if (values.length > 0) {
        if (valuesAreArray(values)) {
            const leafValues = values.reduce((agg, arr) => {
                // biome-ignore lint/complexity/noForEach: <explanation>
                arr.forEach((value: any) => agg.push(value));
                return agg;
            }, []);
            if (valuesAreBoolean(leafValues)) {
                return requiredTypeOrNormal(
                    new GraphQLList(GraphQLBoolean),
                    isRequired,
                );
            }
            if (valuesAreString(leafValues)) {
                return requiredTypeOrNormal(
                    new GraphQLList(GraphQLString),
                    isRequired,
                );
            }
            if (valuesAreInteger(leafValues)) {
                return requiredTypeOrNormal(
                    new GraphQLList(GraphQLInt),
                    isRequired,
                );
            }
            if (valuesAreNumeric(leafValues)) {
                return requiredTypeOrNormal(
                    new GraphQLList(GraphQLFloat),
                    isRequired,
                );
            }
            if (valuesAreObject(leafValues)) {
                return requiredTypeOrNormal(GraphQLJSON, isRequired);
            }
            return requiredTypeOrNormal(
                new GraphQLList(GraphQLString),
                isRequired,
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
