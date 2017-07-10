export default entityData => ({ id }) => {
    const parsedId = parseInt(id, 10); // FIXME fails for non-integer ids
    const indexOfEntity = entityData.findIndex(e => e.id === parsedId);
    const removedEntity = entityData[indexOfEntity];

    entityData = entityData.filter(e => e.id !== id);
    return removedEntity;
};
