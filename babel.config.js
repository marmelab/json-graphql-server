module.exports = {
    env: {
        test: {
            presets: [
                [
                    '@babel/preset-env',
                    {
                        targets: {
                            node: 'current',
                        },
                    },
                ],
                '@babel/preset-typescript',
            ],
        },
        development: {
            presets: [
                [
                    '@babel/preset-env',
                    {
                        modules: false,
                    },
                ],
                '@babel/preset-typescript',
            ],
            plugins: ['add-module-exports'],
        },
        production: {
            presets: [
                [
                    '@babel/preset-env',
                    {
                        modules: false,
                    },
                ],
                '@babel/preset-typescript',
            ],
            plugins: ['add-module-exports'],
        },
    },
};
