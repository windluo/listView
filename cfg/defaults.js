/**
 * Function that returns default values.
 * Used because Object.assign does a shallow instead of a deep copy.
 * Using [].push will add to the base array, so a require will alter
 * the base array output.
 */
'use strict';

const path = require('path');
const srcPath = path.join(__dirname, '../src');
const dfltPort = 8022;

let fs = require('fs');
let ExtractTextPlugin = require("extract-text-webpack-plugin");
/**
 * Get the default modules object for webpack
 * @return {Object}
 */
function getDefaultModules() {
    return {
        loaders: [
            {
                test: /\.vue?$/, 
                loader: "vue"
            },
            { 
                test: /\.js$/, loader: 'babel', 
                exclude: /node_modules/ 
            },
            {
                test: /\.(css|less)$/,
                loader: ExtractTextPlugin.extract("style", "css!less")
            },
            { 
                test: /\.(eot|woff|woff2|svg|ttf)([\?]?.*)$/, 
                loader: "url-loader?limit=50000&name=/dist/fonts/[name]_[hash].[ext]" 
            },
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader?limit=1024&name=/dist/images/[name]_[hash].[ext]'
            }
        ]
    };
}

function getEntries(env){
    const jsSrc = srcPath+'/entry';
    var files = fs.readdirSync(jsSrc);

    var regexp = /(.*)\.js$/;
    var map = {};

    files.forEach((file)=>{
        var matchfile = file.match(regexp);

        if( matchfile ){
            if ( env === 'dev' ) {
                map[matchfile[1]] = [
                    'webpack-dev-server/client?http://127.0.0.1:' + dfltPort,
                    'webpack/hot/dev-server',
                    path.resolve(__dirname,jsSrc+"/"+matchfile[0])
                ];
            } else {
                map[matchfile[1]] = path.resolve(__dirname,jsSrc+"/"+matchfile[0]);
            }
        }

    });

    return map;
}

module.exports = {
    srcPath: srcPath,
    publicPath: '',
    port: dfltPort,
    getDefaultModules: getDefaultModules,
    entries: getEntries
};
