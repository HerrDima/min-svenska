const path = require('path');

// eslint-disable-next-line no-unused-vars
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');

const {
    pathToStaticFileFolder,
    isDevelopment,
    isProduction,
    pathToDist,
    cwd,
    nodeEnvironment,
} = require('./webpack/config');

const webpackConfig = {
    entry: ['./www/css/root.scss', './www/root.tsx'],
    output: {
        pathinfo: false,
        path: path.join(cwd, pathToDist),
        publicPath: isDevelopment ? '/' : pathToStaticFileFolder,
        filename: isDevelopment ? '[name].js' : 'index.js',
        chunkFilename: isDevelopment ? '[name].chunk.js' : '[name].[hash:6].chunk.js',
    },

    mode: nodeEnvironment,
    devtool: isDevelopment ? 'source-map' : false,
    optimization: require('./webpack/setting/optimization').optimization,
    module: {rules: require('./webpack/setting/module/rules').rules},
    resolve: {
        alias: require('./webpack/setting/resolve/alias').alias,
        extensions: require('./webpack/setting/resolve/extensions').extensions,
    },
    plugins: require('./webpack/setting/plugins').plugins,
    devServer: require('./webpack/setting/dev-server').devServer,
};

// webpackConfig.plugins.push(new BundleAnalyzerPlugin());

module.exports = webpackConfig;
