import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import builtins from 'rollup-plugin-node-builtins';
import replace from 'rollup-plugin-replace';

export default {
    entry: './src/index.js',
    dest: 'lib/index.js',
    format: 'umd',
    moduleName: 'JsonGraphqlServer',
    plugins: [
        replace({
            'process.env.NODE_ENV': JSON.stringify('production'),
            'process.env.GRAPHQL_NO_NAME_WARNING': JSON.stringify(false),
            'process.env': JSON.stringify(true),
            process: JSON.stringify(true),
        }),
        builtins(),
        resolve({
            browser: true,
        }),
        commonjs({
            include: 'node_modules/**',
            namedExports: {
                'node_modules/graphql-tools/dist/index.js': [
                    'addMockFunctionsToSchema',
                    'makeExecutableSchema',
                ],
                'node_modules/apollo-test-utils/dist/src/index.js': [
                    'mockNetworkInterfaceWithSchema',
                ],
                'node_modules/graphql/index.js': ['graphql'],
            },
        }),
        babel({
            exclude: 'node_modules/**', // only transpile our source code
        }),
    ],
};
