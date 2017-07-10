import getResolversForEntity from './getResolversForEntity';
import { getTypeNamesFromData } from '../introspection/getTypesFromData';

export default data =>
    getTypeNamesFromData(data).reduce((resolvers, entityName) => {
        resolvers = {
            ...resolvers,
            ...getResolversForEntity(entityName, data),
        };
        return resolvers;
    }, {});
