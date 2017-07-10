import { pluralize, underscore } from 'inflection';

export default (entityName, data) => {
    let entityData = data[underscore(pluralize(entityName))];

    return {
        [`all${pluralize(entityName)}`]: ({ page, perPage, filter = '{}' }) => {
            const filters = JSON.parse(filter);
            let items = entityData;

            if (filters.ids) {
                items = items.filter(d =>
                    filters.ids.includes(d.id.toString()),
                );
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
        },
        [entityName]: ({ id }) => entityData.find(d => d.id == id),
        [`create${entityName}`]: entity => {
            const newEntity = {
                id: entityData[entityData.length - 1].id + 1,
                ...entity,
            };

            entityData.push(newEntity);
            return newEntity;
        },
        [`update${entityName}`]: ({ id, ...updates }) => {
            const parsedId = parseInt(id, 10); // FIXME fails for non-integer ids
            const indexOfEntity = entityData.findIndex(e => e.id === parsedId);

            entityData[indexOfEntity] = {
                ...entityData[indexOfEntity],
                ...updates,
            };
            return entityData[indexOfEntity];
        },
        [`remove${entityName}`]: ({ id }) => {
            const parsedId = parseInt(id, 10); // FIXME fails for non-integer ids
            const indexOfEntity = entityData.findIndex(e => e.id === parsedId);
            const removedEntity = entityData[indexOfEntity];

            entityData = entityData.filter(e => e.id !== id);
            return removedEntity;
        },
    };
};
