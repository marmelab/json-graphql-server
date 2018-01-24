export default (entityData, filter = {}) => {
    let items = [...entityData];

    if (filter.ids) {
        items = items.filter(d => filter.ids.includes(d.id.toString()));
    } else {
        Object.keys(filter).filter(key => key !== 'q').forEach(key => {
            if (key.indexOf('_lte') !== -1) {
                // less than or equal
                const realKey = key.replace(/(_lte)$/, '');
                items = items.filter(d => d[realKey] <= filter[key]);
                return;
            }
            if (key.indexOf('_gte') !== -1) {
                // less than or equal
                const realKey = key.replace(/(_gte)$/, '');
                items = items.filter(d => d[realKey] >= filter[key]);
                return;
            }
            if (key.indexOf('_lt') !== -1) {
                // less than or equal
                const realKey = key.replace(/(_lt)$/, '');
                items = items.filter(d => d[realKey] < filter[key]);
                return;
            }
            if (key.indexOf('_gt') !== -1) {
                // less than or equal
                const realKey = key.replace(/(_gt)$/, '');
                items = items.filter(d => d[realKey] > filter[key]);
                return;
            }

            items = items.filter(
                d =>
                    filter[key] instanceof Date
                        ? +d[key] == +filter[key]
                        : d[key] == filter[key]
            );
        });

        if (filter.q) {
            items = items.filter(d =>
                Object.keys(d).some(
                    key =>
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
