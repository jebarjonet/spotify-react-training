var webpack = require("webpack");

module.exports = {
    devtool: "inline-source-map",
    entry: [
        "webpack-hot-middleware/client",
        "./client/client.js"
    ],
    output: {
        path: require("path").resolve("./dist"),
        filename: "bundle.js",
        publicPath: "/"
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: "babel-loader",
                exclude: /node_modules/,
                query: {
                    presets: ["react", "stage-0", "es2015", "react-hmre"]
                }
            },
            {
                test: /\.less$/,
                loader: "style!css!less"
            }
        ]
    }
};
