import { EntityData } from '../../type';
import applyFilters from './applyFilters';

export default (entityData: EntityData[] = []) =>
    (
        _: any,
        {
            sortField,
            sortOrder = 'asc',
            page,
            perPage = 25,
            filter = {},
        }: {
            sortField?: keyof EntityData;
            sortOrder?: 'asc' | 'desc';
            page?: number;
            perPage?: number;
            filter?: Record<string, unknown>;
        }
    ) => {
        let items = [...entityData];

        if (sortField) {
            const direction = sortOrder.toLowerCase() == 'asc' ? 1 : -1;
            items = items.sort((a, b) => {
                // @ts-expect-error TODO: fix this
                if (a[sortField] > b[sortField]) {
                    return direction;
                }
                // @ts-expect-error TODO: fix this
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
