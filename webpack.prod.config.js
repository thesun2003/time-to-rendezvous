const { merge } = require("webpack-merge");
const path = require("path");
const base = require("./webpack.config");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = merge(base, {
    mode: "production",
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    devtool: false,
    performance: {
        maxEntrypointSize: 900000,
        maxAssetSize: 900000
    },
    optimization: {
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    output: {
                        comments: false
                    }
                }
            })
        ]
    }
});