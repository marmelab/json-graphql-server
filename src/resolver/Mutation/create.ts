export default (entityData = []) => (_: any, entity: any) => {
    const newId =
        // @ts-expect-error TS(2339): Property 'id' does not exist on type 'never'.
        entityData.length > 0 ? entityData[entityData.length - 1].id + 1 : 0;
    const newEntity = Object.assign({}, entity, { id: newId });
    // @ts-expect-error TS(2345): Argument of type 'any' is not assignable to parame... Remove this comment to see the full error message
    entityData.push(newEntity);
    return newEntity;
};
