export default (entityData = []) => (_, params) => {
    const stringId = `${params.id}`;
    const indexOfEntity = entityData.findIndex(e => `${e.id}` === stringId);
    if (indexOfEntity !== -1) {
        entityData[indexOfEntity] = Object.assign(
            {},
            entityData[indexOfEntity],
            params
        );
        return entityData[indexOfEntity];
    }
};
