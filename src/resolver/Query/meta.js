export default entityData => (_, { page, perPage = 25, filter = {} }) => {
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

            items = items.filter(d => d[key] == filter[key]);
        });

        if (filter.q) {
            items = items.filter(d =>
                Object.keys(d).some(key => d[key].toString().includes(filter.q))
            );
        }
    }

    if (page !== undefined && perPage) {
        items = items.slice(page * perPage, page * perPage + perPage);
    }

    return { count: items.length };
};
