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
    outputFile = libraryName + '.[name].min.js';
} else {
    outputFile = libraryName + '.[name].js';
}

const config = {
    entry: {
        node: __dirname + '/src/node.js',
        client: __dirname + '/src/client.js',
    },
    devtool: 'source-map',
    output: {
        path: __dirname + '/lib',
        filename: outputFile,
        library: libraryName,
        libraryTarget: 'umd',
        umdNamedDefine: true,
    },
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

module.exports = config;
