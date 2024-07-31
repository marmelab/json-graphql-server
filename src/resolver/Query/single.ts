import type { Entity } from '../../types';

export default (entityData: Entity[] = []) =>
    (_: any, { id }: { id?: any }) =>
        // biome-ignore lint/suspicious/noDoubleEquals: <explanation>
        entityData.find((d) => d.id == id);
