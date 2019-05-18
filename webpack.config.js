const path = require("path");//nodejs里面的基本包，用来处理路径
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');
const isDev = process.env.NODE_ENV === 'development';
const webpack = require('webpack');
//__dirname表示文件相对于工程的路径
module.exports ={
    entry: path.join(__dirname, 'src/index.js'),
    output: {
        filename: 'static/js/bundle.js',
        path: path.join(__dirname,'dist')
    },
    plugins: [
        // make sure to include the plugin for the magic
        new VueLoaderPlugin(),
        new htmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: 'body'
        })
    ],
    mode:'none',
    module: {
        rules: [
            {//通过vue-loader来识别以vue结尾的文件
                test: /.vue$/,
                loader: 'vue-loader'
            },
            {//通过vue-loader来识别以vue结尾的文件
                test: /.css$/,
                //css的处理方式不同，有嵌入在页面style标签里的，有从外部文件引入的，我们这里用use来声明
                use: [
                    'style-loader',//接受潜在页面内部的style标签的文件。
                    'css-loader'
                ]
            }
        ]
    }
}
if (isDev) {
    webpack.devServer = {
        port: 8000,
        host: '0.0.0.0',
        overlay: {
            errors: true  // webpack编译过程中有任何错误都会提示在页面上
        }
    }
}