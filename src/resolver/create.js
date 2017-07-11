export default entityData => entity => {
    const newEntity = {
        id: entityData[entityData.length - 1].id + 1,
        ...entity,
    };

    entityData.push(newEntity);
    return newEntity;
};
