export default (entityData = [], filter = {}) => {
    let items = [...entityData];

    if (filter.ids) {
        items = items.filter((d) => filter.ids.some((id) => id == d.id));
    } else {
        Object.keys(filter)
            .filter((key) => key !== 'q')
            .forEach((key) => {
                if (key.indexOf('_neq') !== -1) {
                    // not equal to
                    const realKey = key.replace(/(_neq)$/, '');
                    items = items.filter((d) => d[realKey] != filter[key]);
                    return;
                }
                if (key.indexOf('_lte') !== -1) {
                    // less than or equal
                    const realKey = key.replace(/(_lte)$/, '');
                    items = items.filter((d) => d[realKey] <= filter[key]);
                    return;
                }
                if (key.indexOf('_gte') !== -1) {
                    // less than or equal
                    const realKey = key.replace(/(_gte)$/, '');
                    items = items.filter((d) => d[realKey] >= filter[key]);
                    return;
                }
                if (key.indexOf('_lt') !== -1) {
                    // less than or equal
                    const realKey = key.replace(/(_lt)$/, '');
                    items = items.filter((d) => d[realKey] < filter[key]);
                    return;
                }
                if (key.indexOf('_gt') !== -1) {
                    // less than or equal
                    const realKey = key.replace(/(_gt)$/, '');
                    items = items.filter((d) => d[realKey] > filter[key]);
                    return;
                }

                if (Array.isArray(filter[key])) {
                    items = items.filter((item) => {
                        if (Array.isArray(item[key])) {
                            // array filter and array item value: where all items in values
                            return filter[key].every((v) =>
                                item[key].some((itemValue) => itemValue == v)
                            );
                        }
                        // where item in values
                        return (
                            filter[key].filter((v) => v == item[key]).length > 0
                        );
                    });
                } else {
                    items = items.filter((d) =>
                        filter[key] instanceof Date
                            ? +d[key] == +filter[key]
                            : d[key] == filter[key]
                    );
                }
            });

        if (filter.q) {
            items = items.filter((d) =>
                Object.keys(d).some(
                    (key) =>
                        d[key] &&
                        d[key]
                            .toString()
                            .toLowerCase()
                            .includes(filter.q.toLowerCase())
                )
            );
        }
    }

    return items;
};
