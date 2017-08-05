export default (entityData = []) => (_, { id }) => {
    const parsedId = parseInt(id, 10); // FIXME fails for non-integer ids
    const indexOfEntity = entityData.findIndex(e => e.id === parsedId);
    const removedEntity = entityData[indexOfEntity];

    entityData.splice(indexOfEntity, 1);
    return removedEntity;
};
