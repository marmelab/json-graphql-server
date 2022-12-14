export default (entityData = []) => (_: any, {
    id
}: any) => {
    let removedEntity = undefined;
    if (id != null) {
        const stringId = id.toString();
        const indexOfEntity = entityData.findIndex(
            // @ts-expect-error TS(2339): Property 'id' does not exist on type 'never'.
            (e) => e.id != null && e.id.toString() === stringId
        );

        if (indexOfEntity !== -1) {
            removedEntity = entityData.splice(indexOfEntity, 1)[0];
        }
    }
    return removedEntity;
};
