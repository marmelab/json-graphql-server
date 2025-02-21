import type { GraphQLObjectType } from 'graphql';
import type { Data } from '../types';
import getFilterTypesFromData from './getFilterTypesFromData';

export default (name: string, data: Data) =>
    Object.values(getFilterTypesFromData(data)).reduce(
        (hasJSON, type: GraphQLObjectType) => {
            if (hasJSON) return true;
            return Object.values(type.getFields()).reduce(
                (hasJSONField, field: any) => {
                    if (hasJSONField) return true;
                    // biome-ignore lint/suspicious/noDoubleEquals: <explanation>
                    return field.type.name == name;
                },
                false,
            );
        },
        false,
    );
