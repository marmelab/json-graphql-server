import type { Entity } from '../../types';
import create from './create';

export default (entityData: Entity[] = []) =>
    (_: any, entities: { data: Entity[] }) => {
        return entities.data.map((e) => create(entityData)(null, e));
    };
