const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: './src/client/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true, // Ensures old builds are cleaned up
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/client/views/index.html', // Points to your HTML template
        }),
        new MiniCssExtractPlugin({
            filename: 'styles.css',
        }),
    ],
    devServer: {
        static: {
            directory: path.join(__dirname, 'public'), // Serves files from the "public" directory
        },
        compress: true,
        port: 8080,
        historyApiFallback: true, // Serves index.html on 404 routes (good for SPAs)
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader, // Extract CSS into a separate file
                    'css-loader',                // Translates CSS into CommonJS
                    'sass-loader',               // Compiles Sass to CSS
                ],
            },
        ],
    },
    mode: 'development',
};
