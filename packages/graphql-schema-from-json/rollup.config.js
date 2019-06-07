import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import builtins from 'rollup-plugin-node-builtins';
import globals from 'rollup-plugin-node-globals';
import json from 'rollup-plugin-json';

export default {
    input: './src/index.js',
    output: {
        file: 'lib/index.js',
        format: 'umd',
        name: 'json-to-grapgql',
        exports: 'named',
    },
    plugins: [
        resolve({
            mainFields: ['module', 'jsnext:main', 'browser'],
        }),
        commonjs({
            include: 'node_modules/**',
            exclude: 'node_modules/rollup-plugin-node-builtins/**',
            namedExports: {
                'node_modules/graphql/index.js': [
                    'parse',
                    'graphql',
                    'extendSchema',
                    'GraphQLBoolean',
                    'GraphQLError',
                    'GraphQLFloat',
                    'GraphQLID',
                    'GraphQLInputObjectType',
                    'GraphQLInt',
                    'GraphQLList',
                    'GraphQLNonNull',
                    'GraphQLObjectType',
                    'GraphQLScalarType',
                    'GraphQLSchema',
                    'GraphQLString',
                ],
                'node_modules/inflection/lib/inflection.js': [
                    'camelize',
                    'pluralize',
                    'singularize',
                    'underscore',
                ],
            },
        }),
        builtins(),
        globals(),
        json(),
        babel({
            runtimeHelpers: true,
            exclude: 'node_modules/**', // only transpile our source code
        }),
    ],
};
