import { EntityData } from '../type';
import getFilterTypesFromData from './getFilterTypesFromData';

export default (name: string, data: Record<string, EntityData[]>) =>
    Object.values(getFilterTypesFromData(data)).reduce((hasJSON, type) => {
        if (hasJSON) return true;
        return Object.values(type.getFields()).reduce((hasJSONField, field) => {
            if (hasJSONField) return true;
            // @ts-expect-error name is not present on all types
            return field.type.name == name;
        }, false);
    }, false);
