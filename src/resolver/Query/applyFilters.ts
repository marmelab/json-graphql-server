export default (entityData = [], filter = {}) => {
    let items = [...entityData];

    // @ts-expect-error TS(2339): Property 'ids' does not exist on type '{}'.
    if (filter.ids) {
        // @ts-expect-error TS(2339): Property 'ids' does not exist on type '{}'.
        items = items.filter((d) => filter.ids.some((id: any) => id == d.id));
    } else {
        Object.keys(filter)
            .filter((key) => key !== 'q')
            .forEach((key) => {
                if (key.indexOf('_neq') !== -1) {
                    // not equal to
                    const realKey = key.replace(/(_neq)$/, '');
                    // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
                    items = items.filter((d) => d[realKey] != filter[key]);
                    return;
                }
                if (key.indexOf('_lte') !== -1) {
                    // less than or equal
                    const realKey = key.replace(/(_lte)$/, '');
                    // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
                    items = items.filter((d) => d[realKey] <= filter[key]);
                    return;
                }
                if (key.indexOf('_gte') !== -1) {
                    // less than or equal
                    const realKey = key.replace(/(_gte)$/, '');
                    // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
                    items = items.filter((d) => d[realKey] >= filter[key]);
                    return;
                }
                if (key.indexOf('_lt') !== -1) {
                    // less than or equal
                    const realKey = key.replace(/(_lt)$/, '');
                    // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
                    items = items.filter((d) => d[realKey] < filter[key]);
                    return;
                }
                if (key.indexOf('_gt') !== -1) {
                    // less than or equal
                    const realKey = key.replace(/(_gt)$/, '');
                    // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
                    items = items.filter((d) => d[realKey] > filter[key]);
                    return;
                }

                // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
                if (Array.isArray(filter[key])) {
                    items = items.filter((item) => {
                        if (Array.isArray(item[key])) {
                            // array filter and array item value: where all items in values
                            // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
                            return filter[key].every((v: any) => item[key].some((itemValue: any) => itemValue == v)
                            );
                        }
                        // where item in values
                        // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
                        return filter[key].filter((v: any) => v == item[key]).length > 0;
                    });
                } else {
                    items = items.filter((d) =>
                        // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
                        filter[key] instanceof Date
                            // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
                            ? +d[key] == +filter[key]
                            // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
                            : d[key] == filter[key]
                    );
                }
            });

        // @ts-expect-error TS(2339): Property 'q' does not exist on type '{}'.
        if (filter.q) {
            items = items.filter((d) =>
                Object.keys(d).some(
                    (key) =>
                        d[key] &&
                        d[key]
                            // @ts-expect-error TS(2339): Property 'toString' does not exist on type 'never'... Remove this comment to see the full error message
                            .toString()
                            .toLowerCase()
                            // @ts-expect-error TS(2339): Property 'q' does not exist on type '{}'.
                            .includes(filter.q.toLowerCase())
                )
            );
        }
    }

    return items;
};
