import { EntityData } from './../../type';
import applyFilters from './applyFilters';

export default (entityData: EntityData[]) =>
    (_: any, { filter = {} }) => {
        const items = applyFilters(entityData, filter);

        return { count: items.length };
    };
