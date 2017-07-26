export default entityData => (_, { id, ...updates }) => {
    const parsedId = parseInt(id, 10); // FIXME fails for non-integer ids
    const indexOfEntity = entityData.findIndex(e => e.id === parsedId);

    entityData[indexOfEntity] = {
        ...entityData[indexOfEntity],
        ...updates,
    };
    return entityData[indexOfEntity];
};
