const path = require('path');
const webpack = require('webpack');
const DefinePlugin = webpack.DefinePlugin;
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

let libraryName = 'json-graphql-server';

let plugins = [];
let outputFile;

if (process.env.NODE_ENV === 'production') {
    plugins.push(
        new UglifyJsPlugin({
            minimize: true,
            sourceMap: true,
        }),
        new DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production'),
        })
    );
    outputFile = target => `${libraryName}.${target}.min.js`;
} else {
    outputFile = target => `${libraryName}.${target}.js`;
}

const defaultConfig = {
    devtool: 'source-map',
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
        extensions: ['.json', '.js'],
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
    }
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
    }
});

module.exports = [serverConfig, clientConfig];
