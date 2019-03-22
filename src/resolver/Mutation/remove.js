export default (entityData = []) => (_, { id }) => {
    const stringId = `${id}`;
    const indexOfEntity = entityData.findIndex(e => `${e.id}` === stringId);
    let removedEntity = undefined;

    if (indexOfEntity !== -1) {
        removedEntity = entityData.splice(indexOfEntity, 1)[0];
    }
    return removedEntity;
};
