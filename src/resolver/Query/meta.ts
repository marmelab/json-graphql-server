import type { Entity } from '../../types';
import applyFilters from './applyFilters';

export default (entityData: Entity[]) =>
    (_: any, { filter = {} }: { filter: Record<string, any> }) => {
        const items = applyFilters(entityData, filter);

        return { count: items.length };
    };
