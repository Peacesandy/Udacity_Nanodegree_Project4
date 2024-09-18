const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { WorkboxWebpackPlugin } = require('workbox-webpack-plugin');

module.exports = {
    entry: './src/views/index.js',
    mode: 'development',
    devtool: 'source-map',
    stats: 'verbose',
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
                test: /.scss$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                use: [
                    'style-loader', // Inject CSS into the DOM
                    'css-loader',   // Translate CSS into CommonJS
                    'sass-loader',  // Compile SCSS to CSS
                ],
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/client/views/index.html",
            filename: "./index.html",
            loader: "babel-loader"
        }),
        new CleanWebpackPlugin({
            // Simulate the removal of files
            dry: true,
            // Write Logs to Console
            verbose: true,
            // Automatically remove all unused webpack assets on rebuild
            cleanStaleWebpackAssets: true,
            protectWebpackAssets: false
        }),
        new WorkboxWebpackPlugin.GenerateSW({
            clientsClaim: true,
            skipWaiting: true,
        }),
    ]
};
