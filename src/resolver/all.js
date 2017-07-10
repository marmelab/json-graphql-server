export default entityData => ({ page, perPage, filter = '{}' }) => {
    const filters = JSON.parse(filter);
    let items = entityData;

    if (filters.ids) {
        items = items.filter(d => filters.ids.includes(d.id.toString()));
    } else {
        Object.keys(filters).filter(key => key !== 'q').forEach(key => {
            if (key.indexOf('_lte') !== -1) {
                // less than or equal
                const realKey = key.replace(/(_lte)$/, '');
                items = items.filter(d => d[realKey] <= filters[key]);
                return;
            }
            if (key.indexOf('_gte') !== -1) {
                // less than or equal
                const realKey = key.replace(/(_gte)$/, '');
                items = items.filter(d => d[realKey] >= filters[key]);
                return;
            }
            if (key.indexOf('_lt') !== -1) {
                // less than or equal
                const realKey = key.replace(/(_lt)$/, '');
                items = items.filter(d => d[realKey] < filters[key]);
                return;
            }
            if (key.indexOf('_gt') !== -1) {
                // less than or equal
                const realKey = key.replace(/(_gt)$/, '');
                items = items.filter(d => d[realKey] > filters[key]);
                return;
            }

            items = items.filter(d => d[key] == filters[key]);
        });

        if (filters.q) {
            items = items.filter(d =>
                Object.keys(d).some(key =>
                    d[key].toString().includes(filters.q),
                ),
            );
        }
    }

    if (page !== undefined && perPage) {
        items = items.slice(page * perPage, page * perPage + perPage);
    }

    return items;
};
