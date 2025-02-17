import type { Entity } from '../../types';

export default (entityData: Entity[] = []) =>
    (_: any, entity: Entity) => {
        const newId =
            entityData.length > 0
                ? entityData[entityData.length - 1].id + 1
                : 0;
        const newEntity = Object.assign({}, entity, { id: entity.id ?? newId });
        entityData.push(newEntity);
        return newEntity;
    };
