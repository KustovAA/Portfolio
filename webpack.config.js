const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const config = {
    mode: 'development',
    output: {
        filename: 'bundle.js'
    },
    module: {
        rules: [
          {
            test: /\.js$/,
            use: ['babel-loader', 'eslint-loader'],
            exclude: /node_modules/
          }
        ]
    },
    plugins: [
        new UglifyJSPlugin({
            sourceMap: true
        }),
    ]
};

module.exports = config;