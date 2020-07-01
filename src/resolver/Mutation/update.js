export default (entityData = []) => (_, params) => {
    let updatedEntity = undefined;
    if (params.id != null) {
        const stringId = params.id.toString();
        const indexOfEntity = entityData.findIndex(
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
