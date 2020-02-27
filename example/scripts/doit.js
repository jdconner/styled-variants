process.env.NODE_ENV = "production";
const path = require("path");
const webpack = require("webpack");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
    .BundleAnalyzerPlugin;
const webpackConfigProd = require("react-scripts/config/webpack.config")(
    "production"
);
const CracoAlias = require("craco-alias");

// pushing BundleAnalyzerPlugin to plugins array
webpackConfigProd.plugins.push(new BundleAnalyzerPlugin());
webpackConfigProd.plugins.push({
    plugin: CracoAlias,
    options: {
        aliases: {
            react: path.resolve("./node_modules/react"),
            'react-dom': path.resolve("./node_modules/react-dom"),
        },
        // see in examples section
    },
});
// actually running compilation and waiting for plugin to start explorer
webpack(webpackConfigProd, (err, stats) => {
    if (err || stats.hasErrors()) {
        console.error(err);
    }
});
