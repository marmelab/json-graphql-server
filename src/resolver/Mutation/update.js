export default (entityData = []) => (_, params) => {
    const parsedId = parseInt(params.id, 10); // FIXME fails for non-integer ids
    const indexOfEntity = entityData.findIndex(e => e.id === parsedId);
    if (indexOfEntity !== -1) {
        entityData[indexOfEntity] = Object.assign(
            {},
            entityData[indexOfEntity],
            params
        );
        return entityData[indexOfEntity];
    }
};
