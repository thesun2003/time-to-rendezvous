/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
    entry: {
        app: './src/app.ts',
        vendors: ['phaser'],
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },

    resolve: {
        extensions: [ '.ts', '.tsx', '.js' ],
        plugins: [
            new TsconfigPathsPlugin({
                configFile: path.resolve(__dirname, 'tsconfig.json')
            })
        ],
    },

    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },

    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',

    devServer: {
        static: path.join(__dirname, 'dist'),
        devMiddleware: {
            writeToDisk: true,
        },
        client: {
            progress: true,
        },
        open: true,
        hot: true,
        historyApiFallback: true,
        compress: true,
    },

    plugins: [
        new CopyPlugin({
            patterns: [
                {
                    from: 'index.html',
                },
                {
                    from: 'assets/**/*',
                },
            ],
        }),
        new CleanWebpackPlugin({
            root: path.resolve(__dirname, "../")
        }),
        new webpack.DefinePlugin({
            CANVAS_RENDERER: JSON.stringify(true),
            WEBGL_RENDERER: JSON.stringify(true)
        }),
        // new HtmlWebpackPlugin({
        //     template: "./index.html"
        // })
    ],

    // optimization: {
    //     splitChunks: {
    //         chunks: 'all',
    //         filename: '[name].vendors.js',
    //     },
    // },

    // optimization: {
    //     splitChunks: {
    //         cacheGroups: {
    //             commons: {
    //                 test: /[\\/]node_modules[\\/]/,
    //                 name: 'vendors',
    //                 chunks: 'all',
    //                 filename: 'dist/[name].vendors.js',
    //             },
    //         },
    //     },
    // },
};
