import { resolve } from 'path';
import { defineConfig } from 'vite';


export default defineConfig({
    build: {
        lib: {
            // Could also be a dictionary or array of multiple entry points
            entry: resolve(__dirname, 'src/client.js'),
            name: 'JsonGraphqlServer',
            formats: ['umd'],
            fileName: 'json-graphql-server',
        },
        sourcemap: true,
        minify: process.env.NODE_ENV === 'production',
        emptyOutDir: false
    },
});
