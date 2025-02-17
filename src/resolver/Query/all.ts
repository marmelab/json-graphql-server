import type { Entity } from '../../types';
import applyFilters from './applyFilters';

export default (entityData: Entity[] = []) =>
    (
        _: any,
        {
            sortField,
            sortOrder = 'asc',
            page,
            perPage = 25,
            filter = {},
        }: {
            sortField?: string;
            sortOrder?: string;
            page?: number;
            perPage?: number;
            filter?: Record<string, any>;
        },
    ) => {
        let items = [...entityData];

        if (sortField) {
            // biome-ignore lint/suspicious/noDoubleEquals: <explanation>
            const direction = sortOrder.toLowerCase() == 'asc' ? 1 : -1;
            items = items.sort((a, b) => {
                if (a[sortField] > b[sortField]) {
                    return direction;
                }
                if (a[sortField] < b[sortField]) {
                    return -1 * direction;
                }
                return 0;
            });
        }

        items = applyFilters(items, filter);

        if (page !== undefined && perPage) {
            items = items.slice(page * perPage, page * perPage + perPage);
        }

        return items;
    };
