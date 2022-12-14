export default (entityData = []) => (_: any, params: any) => {
    let updatedEntity = undefined;
    if (params.id != null) {
        const stringId = params.id.toString();
        const indexOfEntity = entityData.findIndex(
            // @ts-expect-error TS(2339): Property 'id' does not exist on type 'never'.
            (e) => e.id != null && e.id.toString() === stringId
        );
        if (indexOfEntity !== -1) {
            entityData[indexOfEntity] = Object.assign(
                {},
                entityData[indexOfEntity],
                params
            );
            updatedEntity = entityData[indexOfEntity];
        }
    }
    return updatedEntity;
};
