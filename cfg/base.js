'use strict';
let path = require('path');
var webpack = require('webpack');
let HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

let defaultSettings = require('./defaults');
let entries = defaultSettings.entries();
var chunks = Object.keys(entries);

let config = {
    port: defaultSettings.port,
    debug: true,
    devtool: 'eval',
    output: {
        path: path.join(__dirname, '../'),
        filename: './dist/bundle/[name].js',
        publicPath: defaultSettings.publicPath
    },
    devServer: {
        contentBase: './',
        historyApiFallback: true,
        hot: true,
        stats: { colors: true },
        port: defaultSettings.port,
        publicPath: defaultSettings.publicPath,
        noInfo: false,
        proxy: {
            // '/op/api': {
            //     target: 'http://120.24.219.112/',
            //     secure: false
            // }
        }
    },
    // 转化成es5的语法
    babel: {
        presets: ['es2015', 'stage-3'],
        plugins: ['transform-runtime', ['component', [
            {
              "libraryName": "element-ui",
              "styleLibraryName": "theme-default"
            }
        ]]]
    },
    resolve: {
        extensions: ['', '.js', '.vue'],
        alias: {
            src: `${defaultSettings.srcPath}/`,
            'vue': 'vue/dist/vue.js'
        }
    },
    plugins: [
        new webpack.ProvidePlugin({ //载入jq,这样就不用每个里面都require了，直接使用  $
            // $: "jquery"
            // gl: 'gl',
        }),
    	new webpack.optimize.CommonsChunkPlugin({
            name: 'vendors', // 将公共模块提取，生成名为`vendors`的chunk
            chunks: chunks,
            minChunks: chunks.length // 提取所有entry共同依赖的模块
        }),
        new ExtractTextPlugin('./dist/css/[name]-[contenthash:8].css')
        // new CopyWebpackPlugin([
        //     { from: './src/images/static', to: './dist/images/static', toType: 'dir' },
        //     { from: './src/libs', to: './dist/libs', toType: 'dir' }
        // ])
    ]
};

chunks.forEach(function(entry){
	let conf = {
        template:'src/'+entry+'.html',
        filename: entry+'.html',
        chunks: [entry,'vendors'],
        minify: { //压缩HTML文件
            removeComments: true //移除HTML中的注释
        },
        hash: false
    }
    config.plugins.push(new HtmlWebpackPlugin(conf));
});

module.exports = config;
