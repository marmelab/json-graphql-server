export default (entityData: any[] = []) =>
    (_: any, { id }: any) =>
        entityData.find((d) => d.id == id);
