import getFilterTypesFromData from './getFilterTypesFromData';

export default (name: any, data: any) =>
    Object.values(getFilterTypesFromData(data)).reduce((hasJSON, type) => {
        if (hasJSON) return true;
        // @ts-expect-error TS(2571): Object is of type 'unknown'.
        return Object.values(type.getFields()).reduce((hasJSONField, field) => {
            if (hasJSONField) return true;
            // @ts-expect-error TS(2571): Object is of type 'unknown'.
            return field.type.name == name;
        }, false);
    }, false);
