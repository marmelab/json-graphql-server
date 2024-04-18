import { resolve } from 'path';
import { defineConfig } from 'vite';

import pkg from './package.json';

export default defineConfig({
    build: {
        lib: {
            // Could also be a dictionary or array of multiple entry points
            entry: resolve(__dirname, 'src/client.js'),
            name: 'JsonGraphqlServer',
            formats: ['es', 'cjs'],
        },
        sourcemap: true,
        minify: process.env.NODE_ENV === 'production',
        rollupOptions: {
            // make sure to externalize deps that shouldn't be bundled
            // into your library
            external: Object.keys(pkg.dependencies),
        },
    },
});
