const express = require("express"),
    path = require("path"),
    config = require("../webpack.config.js"),
    webpack = require("webpack"),
    webpackDevMiddleware = require("webpack-dev-middleware"),
    webpackHotMiddleware = require("webpack-hot-middleware");

const app = express(),
    compiler = webpack(config);

app.use(webpackDevMiddleware(compiler, {noInfo: true, publicPath: config.output.publicPath}));
app.use(webpackHotMiddleware(compiler));

app.use(express.static("./dist"));

app.use("/", function (req, res) {
    res.sendFile(path.resolve("client/index.html"));
});

const port = 3000;

app.listen(port, function (error) {
    if (error) {
        throw error;
    }

    console.log("Express server listening on port", port);
});
