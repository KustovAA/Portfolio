const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const path = require('path');

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
          },
          {
            test: /\.vue$/,
            loader: 'vue-loader',
            options: {
                loaders: {
                    scss: [
                        'vue-style-loader',
                        'css-loader',
                        'sass-loader'
                    ]
                }
            }
          }
        ]
    },
    resolve: {
        alias: {
          vue$: 'vue/dist/vue.esm.js',
          styles: path.resolve(__dirname, 'src/styles/components/'),
          images: path.resolve(__dirname, 'src/images/img/')
        }
    },
    plugins: [
        new UglifyJSPlugin({
            sourceMap: true
        }),
    ]
};

module.exports = config;