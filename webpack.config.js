const path = require("path");
const webpack = require("webpack");

module.exports = {
    entry: "./src/index.js",
    mode: "development",
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules)/,
                loader: "babel-loader",
                options: { presets: ["@babel/env"] },
            },
            {
                test: /\.sass$/,
                use: ["style-loader", "css-loader", "sass-loader"],
            },
            {
                test: /\.(jpg|png)$/,
                use: {
                    loader: "url-loader",
                },
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: {
                    loader: "url-loader",
                },
            },
        ],
    },
    resolve: { extensions: ["*", ".js", ".jsx"] },
    output: {
        path: path.resolve(__dirname, "dist/"),
        publicPath: "/dist/",
        filename: "bundle.js",
    },
    devServer: {
        contentBase: path.join(__dirname, "public/"),
        port: 3000,
        publicPath: "http://localhost:3000/",
        hotOnly: true,
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            "process.env.RANKINGS_HISTORY_URL": JSON.stringify(process.env.RANKINGS_HISTORY_URL),
            "process.env.ALL_DIVISIONS_URL": JSON.stringify(process.env.ALL_DIVISIONS_URL),
        }),
    ],
};
