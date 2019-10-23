module.exports = {
    verbose: true,
    projects: [
        {
            displayName: 'graphql-schema-from-json',
            testMatch: [
                '<rootDir>/packages/graphql-schema-from-json/**/*.spec.js',
            ],
        },
        {
            displayName: 'json-graphql-server',
            testMatch: ['<rootDir>/packages/json-graphql-server/**/*.spec.js'],
        },
    ],
};
