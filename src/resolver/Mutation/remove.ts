import type { Entity } from '../../types';

export default (entityData: Entity[] = []) =>
    (_: any, { id }: { id?: any }) => {
        let removedEntity = undefined;
        if (id != null) {
            const stringId = id.toString();
            const indexOfEntity = entityData.findIndex(
                (e) => e.id != null && e.id.toString() === stringId,
            );

            if (indexOfEntity !== -1) {
                removedEntity = entityData.splice(indexOfEntity, 1)[0];
            }
        }
        return removedEntity;
    };
