import create from './create';

export default (entityData = []) => (_, entities) => {
    return entities.data.map((e) => create(entityData)(null, e));
};
