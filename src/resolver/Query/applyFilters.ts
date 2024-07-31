import type { Entity } from '../../types';

export default (
    entityData: Entity[] = [],
    filter: Record<string, any> = {},
) => {
    let items = [...entityData];

    if (filter.ids) {
        // biome-ignore lint/suspicious/noDoubleEquals: <explanation>
        items = items.filter((d) => filter.ids.some((id: any) => id == d.id));
    } else {
        // biome-ignore lint/complexity/noForEach: <explanation>
        Object.keys(filter)
            .filter((key) => key !== 'q')
            .forEach((key) => {
                if (key.indexOf('_neq') !== -1) {
                    // not equal to
                    const realKey = key.replace(/(_neq)$/, '');
                    items = items.filter((d) => {
                        if (
                            filter[key] instanceof Date &&
                            typeof d[realKey] === 'string'
                        ) {
                            // biome-ignore lint/suspicious/noDoubleEquals: <explanation>
                            return d[realKey] != filter[key].toISOString();
                        }
                        // biome-ignore lint/suspicious/noDoubleEquals: <explanation>
                        return d[realKey] != filter[key];
                    });
                    return;
                }
                if (key.indexOf('_lte') !== -1) {
                    // less than or equal
                    const realKey = key.replace(/(_lte)$/, '');
                    items = items.filter((d) => {
                        if (
                            filter[key] instanceof Date &&
                            typeof d[realKey] === 'string'
                        ) {
                            return d[realKey] <= filter[key].toISOString();
                        }
                        return d[realKey] <= filter[key];
                    });
                    return;
                }
                if (key.indexOf('_gte') !== -1) {
                    // less than or equal
                    const realKey = key.replace(/(_gte)$/, '');
                    items = items.filter((d) => {
                        if (
                            filter[key] instanceof Date &&
                            typeof d[realKey] === 'string'
                        ) {
                            return d[realKey] >= filter[key].toISOString();
                        }
                        return d[realKey] >= filter[key];
                    });
                    return;
                }
                if (key.indexOf('_lt') !== -1) {
                    // less than or equal
                    const realKey = key.replace(/(_lt)$/, '');
                    items = items.filter((d) => {
                        if (
                            filter[key] instanceof Date &&
                            typeof d[realKey] === 'string'
                        ) {
                            return d[realKey] < filter[key].toISOString();
                        }
                        return d[realKey] < filter[key];
                    });
                    return;
                }
                if (key.indexOf('_gt') !== -1) {
                    // less than or equal
                    const realKey = key.replace(/(_gt)$/, '');
                    items = items.filter((d) => {
                        if (
                            filter[key] instanceof Date &&
                            typeof d[realKey] === 'string'
                        ) {
                            return d[realKey] > filter[key].toISOString();
                        }
                        return d[realKey] > filter[key];
                    });
                    return;
                }

                if (Array.isArray(filter[key])) {
                    items = items.filter((item) => {
                        if (Array.isArray(item[key])) {
                            // array filter and array item value: where all items in values
                            return filter[key].every((v: any) =>
                                item[key].some((itemValue: any) => {
                                    if (
                                        v instanceof Date &&
                                        typeof itemValue === 'string'
                                    ) {
                                        // biome-ignore lint/suspicious/noDoubleEquals: <explanation>
                                        return itemValue == v.toISOString();
                                    }
                                    // biome-ignore lint/suspicious/noDoubleEquals: <explanation>
                                    return itemValue == v;
                                }),
                            );
                        }
                        // where item in values
                        return (
                            filter[key].filter((v: any) => {
                                if (
                                    v instanceof Date &&
                                    typeof item[key] === 'string'
                                ) {
                                    // biome-ignore lint/suspicious/noDoubleEquals: <explanation>
                                    return item[key] == v.toISOString();
                                }
                                // biome-ignore lint/suspicious/noDoubleEquals: <explanation>
                                return v == item[key];
                            }).length > 0
                        );
                    });
                } else {
                    items = items.filter((d) => {
                        if (
                            filter[key] instanceof Date &&
                            typeof d[key] === 'string'
                        ) {
                            // biome-ignore lint/suspicious/noDoubleEquals: <explanation>
                            return d[key] == filter[key].toISOString();
                        }
                        return filter[key] instanceof Date
                            ? // biome-ignore lint/suspicious/noDoubleEquals: <explanation>
                              +d[key] == +filter[key]
                            : // biome-ignore lint/suspicious/noDoubleEquals: <explanation>
                              d[key] == filter[key];
                    });
                }
            });

        if (filter.q) {
            items = items.filter((d) =>
                Object.keys(d).some((key) =>
                    d[key]
                        ?.toString()
                        .toLowerCase()
                        .includes(filter.q.toLowerCase()),
                ),
            );
        }
    }

    return items;
};
