/// <reference types="vitest" />
import { resolve } from 'node:path';
import { defineConfig } from 'vite';

import pkg from './package.json';

export default defineConfig({
    build: {
        lib: {
            // Could also be a dictionary or array of multiple entry points
            entry: resolve(__dirname, 'src/client.ts'),
            name: 'JsonGraphqlServer',
            formats: ['es', 'cjs'],
            fileName: 'json-graphql-server',
        },
        sourcemap: true,
        minify: process.env.NODE_ENV === 'production',
        rollupOptions: {
            // make sure to externalize deps that shouldn't be bundled
            // into your library
            external: Object.keys(pkg.dependencies),
        },
    },
    test: {
        globals: true,
    },
    resolve: {
        alias: {
            // See https://github.com/vitest-dev/vitest/issues/4605#issuecomment-1847875818
            'graphql/language/printer': 'graphql/language/printer.js',
            'graphql/language': 'graphql/language/index.js',
            graphql: 'graphql/index.js',
        },
    },
});
