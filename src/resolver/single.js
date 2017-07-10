export default entityData => ({ id }) => entityData.find(d => d.id == id);
