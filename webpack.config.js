const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

/* Rules */
const ruleForJsFiles = { test: /\.js$/, loader: "babel-loader" };
const ruleForSassFiles = { test: /\.scss$/, use: [{ loader: MiniCssExtractPlugin.loader, options: { publicPath: "./" } }, "css-loader", "sass-loader"] };
const ruleForHtmlFiles = { test: /\.html$/i, use: [{ loader: "html-loader", options: { minimize: false, sources: false } }] };
const rueForImageFiles = {
    test: /\.(jpe?g|png|gif|svg|webp)$/i,
    // use: ["file-loader?name=assets/[name].[ext]", "image-webpack-loader"],
    // use: ["file-loader", "image-webpack-loader"],
    use: ["file-loader?name=assets/[name].[ext]"],
};
const RULES = [ruleForJsFiles, ruleForSassFiles, ruleForHtmlFiles, rueForImageFiles];

/* Plugins */
// Plugin for .html files
const htmlWebpackPlugin = new HtmlWebpackPlugin({ template: "src/index.html", inject: "body", filename: "index.html" });
// Plugin to add globals to javascript
const jqueryProviderPlugin = new webpack.ProvidePlugin({
    jQuery: "jquery",
    $: "jquery",
    "window.jQuery": "jquery",
});
// Plugin to extract css to files
const miniCssExtrarPlugin = new MiniCssExtractPlugin({
    filename: "css/[name].[fullhash].css",
});
// Plugin to move assets folder
const copyWebpackPlugin = new CopyWebpackPlugin({
    patterns: [{
        from: "src/assets",
        to: "assets",
        force: true,
    }, ],
});
const PLUGINS = [htmlWebpackPlugin, jqueryProviderPlugin, miniCssExtrarPlugin, copyWebpackPlugin];

module.exports = (env, args) => {
    const isProduction = args.mode == "production";
    return {
        entry: "./src/main.js",
        output: {
            filename: isProduction ? "[name].[contenthash].js" : "[name].js",
            path: path.resolve(__dirname, "build"),
        },
        module: { rules: RULES },
        plugins: [...PLUGINS],
        devServer: {
            open: true,
        },
    };
};