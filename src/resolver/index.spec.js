import resolver from '.';

describe('With options', () => {
    test('readonly skips creating the Mutation type', () => {
        const options = { readonly: true };
        const schemas = resolver({ posts: [] }, options);
        expect(schemas.Mutation).toBeUndefined();
    });
});
