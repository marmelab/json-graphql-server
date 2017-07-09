export default entities =>
    entities.reduce((values, entity) => {
        Object.keys(entity).forEach(fieldName => {
            if (!values[fieldName]) {
                values[fieldName] = [];
            }
            if (entity[fieldName] != null) {
                values[fieldName].push(entity[fieldName]);
            }
        });
        return values;
    }, {});
