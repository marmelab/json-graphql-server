import getFilterTypesFromData from './getFilterTypesFromData';

export default (name, data) =>
    Object.values(getFilterTypesFromData(data)).reduce((hasJSON, type) => {
        if (hasJSON) return true;
        return Object.values(type.getFields()).reduce((hasJSONField, field) => {
            if (hasJSONField) return true;
            return field.type.name == name;
        }, false);
    }, false);
