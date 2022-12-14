export default (entityData = []) => (_: any, {
    id
}: any) =>
    // @ts-expect-error TS(2339): Property 'id' does not exist on type 'never'.
    entityData.find((d) => d.id == id);
