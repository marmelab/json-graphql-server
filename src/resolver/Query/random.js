import applyFilters from './applyFilters';

const getRandomNumber = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

export default (entityData = []) => (_, { count = 3, filter = {} }) => {
    let items = [...entityData];
    items = applyFilters(items, filter);

    // cut down to count items
    let returnCount = Math.min(count, items.length);
    let randomItems = [];
    for (let i = 0; i < returnCount; i++) {
        randomItems.push(items[getRandomNumber(0, items.length - 1)]);
    }

    return randomItems;
};
