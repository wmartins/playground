const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    context: path.join(__dirname, 'src'),

    entry: {
        main: './scripts/index.js',
    },

    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js',
    },

    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loaders: ['babel']
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                loader: ExtractTextPlugin.extract('style', ['css', 'postcss']),
            },
        ],
    },

    plugins: [
        new ExtractTextPlugin('index.css'),

        new HtmlWebpackPlugin(),
    ]
};
