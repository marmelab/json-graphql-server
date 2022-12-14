import create from './create';

export default (entityData = []) => (_: any, entities: any) => {
    return entities.data.map((e: any) => create(entityData)(null, e));
};
