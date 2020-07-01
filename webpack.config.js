const path = require('path');

let libraryName = 'json-graphql-server';

let plugins = [];
let outputFile;

if (process.env.NODE_ENV === 'production') {
    outputFile = target => `${libraryName}.${target}.min.js`;
} else {
    outputFile = target => `${libraryName}.${target}.js`;
}

const defaultConfig = {
    devtool: 'source-map',
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
    module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/,
                loader: 'babel-loader',
                exclude: /(node_modules|bower_components)/,
            },
        ],
    },
    resolve: {
        modules: [path.resolve('./node_modules'), path.resolve('./src')],
        extensions: ['.mjs', '.json', '.js'],
    },
    plugins,
};

const serverConfig = Object.assign({}, defaultConfig, {
    target: 'node',
    entry: __dirname + '/src/node.js',
    output: {
        path: path.resolve(__dirname, 'lib'),
        filename: outputFile('node'),
        library: libraryName,
        libraryTarget: 'umd',
        umdNamedDefine: true,
    },
});

const clientConfig = Object.assign({}, defaultConfig, {
    target: 'web',
    entry: __dirname + '/src/client.js',
    output: {
        path: path.resolve(__dirname, 'lib'),
        filename: outputFile('client'),
        library: libraryName,
        libraryTarget: 'umd',
        umdNamedDefine: true,
    },
});

module.exports = [serverConfig, clientConfig];
