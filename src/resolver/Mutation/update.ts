import type { Entity } from '../../types';

export default (entityData: Entity[] = []) =>
    (_: any, params: Entity) => {
        let updatedEntity = undefined;
        if (params.id != null) {
            const stringId = params.id.toString();
            const indexOfEntity = entityData.findIndex(
                (e) => e.id != null && e.id.toString() === stringId,
            );
            if (indexOfEntity !== -1) {
                entityData[indexOfEntity] = Object.assign(
                    {},
                    entityData[indexOfEntity],
                    params,
                );
                updatedEntity = entityData[indexOfEntity];
            }
        }
        return updatedEntity;
    };
