import { EntityData } from '../../type';

export default (entityData: EntityData[] = []) =>
    (_: any, entity: any) => {
        const newId =
            entityData.length > 0
                ? // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  entityData[entityData.length - 1].id + 1
                : 0;
        const newEntity = Object.assign({}, entity, { id: newId });
        entityData.push(newEntity);
        return newEntity;
    };
