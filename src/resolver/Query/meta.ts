import applyFilters from './applyFilters';

export default (entityData: any) => (_: any, { filter = {} }) => {
    let items = applyFilters(entityData, filter);

    return { count: items.length };
};
