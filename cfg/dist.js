'use strict';

let path = require('path');
let webpack = require('webpack');

let baseConfig = require('./base');
let defaultSettings = require('./defaults');

// Add needed plugins here
let BowerWebpackPlugin = require('bower-webpack-plugin');

let config = Object.assign({}, baseConfig, {
    entry: defaultSettings.entries('dist'),
    cache: false,
    output: {
        path: path.join(__dirname, '../'),
        filename: './dist/bundle/[name]-[chunkhash:8].js',
        publicPath: defaultSettings.publicPath
    },
    // devtool: false,      //关闭map文件
    devtool: 'source-map',      //查看完整的map源码
    plugins: baseConfig.plugins.concat([
        new webpack.optimize.DedupePlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"'
        }),
        new BowerWebpackPlugin({
            searchResolveModulesDirectories: false
        }),
        new webpack.optimize.UglifyJsPlugin({
            // 最紧凑的输出
            beautify: false,
            // 删除所有的注释
            comments: false,
            compress: {
                // 在UglifyJs删除没有用到的代码时不输出警告  
                warnings: false,
                // 删除所有的 `console` 语句
                // 还可以兼容ie浏览器
                // drop_console: true,
                // 内嵌定义了但是只用到一次的变量
                collapse_vars: true,
                // 提取出出现多次但是没有定义成变量去引用的静态值
                reduce_vars: true,
            }
        }),      //压缩代码，提交的时候记得压缩
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.AggressiveMergingPlugin(),
        new webpack.NoErrorsPlugin()
    ]),
    module: defaultSettings.getDefaultModules()
});

module.exports = config;
