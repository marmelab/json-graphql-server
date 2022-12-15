import { EntityData } from './../../type';
import create from './create';

export default (entityData: EntityData[] = []) =>
    (_: any, entities: any) => {
        return entities.data.map((e: any) => create(entityData)(null, e));
    };
