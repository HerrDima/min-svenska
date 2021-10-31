const path = require('path');
const nodeExternals = require('webpack-node-externals');

const {
    pathToStaticFileFolder,
    isDevelopment,
    isProduction,
    pathToDist,
    cwd,
    nodeEnvironment,
    isBuildLibrary,
    isFront,
    isBack,
} = require('./webpack/config');

const webpackConfigFront = {
    entry: [
        './www/css/root.scss',
        'markdown-pro/dist/style.css',
        'react-audio-player-pro/dist/style.css',
        './www/root.tsx',
    ],
    output: {
        pathinfo: false,
        path: path.join(cwd, pathToDist),
        publicPath: isDevelopment ? '/' : pathToStaticFileFolder,
        filename: isDevelopment ? '[name].js' : 'index.js',
        chunkFilename: isDevelopment ? '[name].chunk.js' : '[name].[hash:6].chunk.js',
        assetModuleFilename: isDevelopment
            ? 'build-asset/[name]----[hash:6][ext][query]'
            : 'build-asset/[hash:6][ext][query]',
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

const webpackConfigBack = {
    ...webpackConfigFront,
    entry: ['./server/server.tsx'],
    optimization: {minimize: false},
    target: 'node',
    // devtool: 'source-map',
    externalsPresets: {node: true}, // in order to ignore built-in modules like path, fs, etc.
    externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
};

const webpackConfigBuildLibraryFront = {
    entry: ['./www/library/library.ts'],
    output: {
        pathinfo: false,
        path: path.join(cwd, 'dist'),
        publicPath: '',
        filename: 'index.js',
        libraryTarget: 'commonjs2',
    },

    mode: nodeEnvironment,
    devtool: false,
    optimization: require('./webpack/setting/optimization').optimization,
    module: {rules: require('./webpack/setting/module/rules').rules},
    resolve: {
        alias: require('./webpack/setting/resolve/alias').alias,
        extensions: require('./webpack/setting/resolve/extensions').extensions,
    },
    plugins: require('./webpack/setting/plugins').plugins,
    devServer: require('./webpack/setting/dev-server').devServer,
    externals: {
        // Don't bundle react and react-dom
        react: {
            commonjs: 'react',
            commonjs2: 'react',
            amd: 'React',
            root: 'React',
        },
        'react-dom': {
            commonjs: 'react-dom',
            commonjs2: 'react-dom',
            amd: 'ReactDOM',
            root: 'ReactDOM',
        },
        'react-router-dom': {
            commonjs: 'react-router-dom',
            commonjs2: 'react-router-dom',
            amd: 'ReactRouterDOM',
            root: 'ReactRouterDOM',
        },
    },
};

const webpackConfigBuildLibraryBack = {...webpackConfigBuildLibraryFront};

let webpackConfigBySide = null;
webpackConfigBySide = isFront ? webpackConfigFront : webpackConfigBySide;
webpackConfigBySide = isBack ? webpackConfigBack : webpackConfigBySide;

let webpackConfigBuildLibraryBySide = null;
webpackConfigBuildLibraryBySide = isFront ? webpackConfigBuildLibraryFront : webpackConfigBuildLibraryBySide;
webpackConfigBuildLibraryBySide = isBack ? webpackConfigBuildLibraryBack : webpackConfigBuildLibraryBySide;

// const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');
// webpackConfig.plugins.push(new BundleAnalyzerPlugin());

module.exports = isBuildLibrary ? webpackConfigBuildLibraryBySide : webpackConfigBySide;
