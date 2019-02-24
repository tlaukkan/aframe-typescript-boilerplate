const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: './src/browser/index.ts',
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: [ '.ts', ".js", ".json"]
    },
    module: {
        rules: [
            { test: /\.ts?$/, loader: "ts-loader" }
        ]
    },
    externals: {
        three: 'THREE'
    },
    mode: "production"
};