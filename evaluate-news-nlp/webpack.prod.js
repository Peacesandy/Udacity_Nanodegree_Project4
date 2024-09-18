const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const { WorkboxWebpackPlugin } = require('workbox-webpack-plugin');

module.exports = {
    entry: './src/views/index.js',
    mode: 'production',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
        fallback: {
            "zlib": require.resolve("browserify-zlib"),
            "path": require.resolve("path-browserify"),
            "crypto": require.resolve("crypto-browserify"),
            "http": require.resolve("stream-http"),
            "stream": require.resolve("stream-browserify"),
            "os": require.resolve("os-browserify/browser"),
            "fs": false, // fs is not available in the browser, so set it to false
            "net": false, // net is a Node.js module, so disable it in the browser
            "querystring": require.resolve("querystring-es3")
        }
    },
    module: {
        rules: [
            {
                test: /.css$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                use: ['style-loader', 'css-loader', 'scss-loader'],
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/client/views/index.html",
            filename: "./index.html",
        }),
        new WorkboxWebpackPlugin.GenerateSW({
            clientsClaim: true,
            skipWaiting: true,
        }),
    ]
};
