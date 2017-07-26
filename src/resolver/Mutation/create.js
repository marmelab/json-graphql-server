export default entityData => (_, entity) => {
    const newEntity = {
        id: entityData[entityData.length - 1].id + 1,
        ...entity,
    };

    entityData.push(newEntity);
    return newEntity;
};
