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
            items = items.sort(
                (a, b) => direction * compareValues(a[sortField], b[sortField]),
            );
        }

        items = applyFilters(items, filter);

        if (page !== undefined && perPage) {
            items = items.slice(page * perPage, page * perPage + perPage);
        }

        return items;
    };

// null and undefined compare as equal to every value with < and >, which makes
// the sort order depend on the input order. They are treated as larger than any
// other value, like PostgreSQL's default: NULLS LAST in ascending order and
// NULLS FIRST in descending order.
const compareValues = (a: any, b: any) => {
    const aIsEmpty = a == null;
    const bIsEmpty = b == null;
    if (aIsEmpty || bIsEmpty) {
        return Number(aIsEmpty) - Number(bIsEmpty);
    }
    if (a > b) {
        return 1;
    }
    if (a < b) {
        return -1;
    }
    return 0;
};
