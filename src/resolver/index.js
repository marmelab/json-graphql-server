import { pluralize, underscore } from 'inflection';

import all from './all';
import meta from './meta';
import single from './single';
import create from './create';
import update from './update';
import remove from './remove';
import { getTypeNamesFromData } from '../introspection/getTypesFromData';

const getResolversForEntity = (entityName, data) => {
    let entityData = data[underscore(pluralize(entityName))];

    return {
        [`all${pluralize(entityName)}`]: all(entityData),
        [`_all${pluralize(entityName)}Meta`]: meta(entityData),
        [entityName]: single(entityData),
        [`create${entityName}`]: create(entityData),
        [`update${entityName}`]: update(entityData),
        [`remove${entityName}`]: remove(entityData),
    };
};

export default data =>
    getTypeNamesFromData(data).reduce(
        (resolvers, entityName) => ({
            ...resolvers,
            ...getResolversForEntity(entityName, data),
        }),
        {},
    );
