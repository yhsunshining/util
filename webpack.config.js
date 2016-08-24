//var webpack = require('webpack');
//var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');

module.exports = {
    //插件项
//	plugins: [commonsPlugin],
    //页面入口文件配置
    entry: {
        index: [
            './js/src/index.js'
        ],
    },
    //入口文件输出配置
    output: {
        path: './js/dist/',
        filename: '[name].js'
    },
    module: {
        //加载器配置
        loaders: [{
            test: /\.tpl$/,
            loader: 'tmodjs-loader'
        }, {
            test: /\.css$/,
            loader: 'style-loader!css-loader'
        }, {
            test: /\.scss$/,
            loader: 'style!css!sass?sourceMap'
        }, {
            test: /\.(png|jpg)$/,
            loader: 'url-loader?limit=8192'
        }, {
            test: /zepto.js$/,
            loader: 'exports?Zepto; delete window.$; delete window.Zepto;'
        }, {
            test: /\.vue$/, loader: 'vue'
        }, {
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel', // 'babel-loader' is also a legal name to reference
            query: {
                presets: ['es2015']
            }
        }]
    },
    watch: true,
    //其它解决方案配置
    resolve: {
        extensions: ['', '.js', '.json', '.scss'],
        alias: {
            zepto: '../lib/zepto.js'
        }
    }
};
