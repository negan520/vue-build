const path = require("path");//nodejs里面的基本包，用来处理路径
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');
const isDev = process.env.NODE_ENV === 'development';
const ParallelUglifyPlugin=require('webpack-parallel-uglify-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
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
        }),
        new ExtractTextPlugin({
            filename: "style/index.css?[chunkhash]"
        }),
        new CleanWebpackPlugin(),
    ],
    mode:'production',
    module: {
        rules: [
            {//通过vue-loader来识别以vue结尾的文件
                test: /.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /.js$/,
              //  include: [__dirname + 'dist'],
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: ['es2015'],
                }
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader'],
                    filename:'[name].min.css'
                })
            }
        ],
    },
    optimization: {
        minimizer: [
            new ParallelUglifyPlugin({
                // 传递给 UglifyJS 的参数
                uglifyJS: {
                    output: {
                        // 最紧凑的输出
                        beautify: false,
                        // 删除所有的注释
                        comments: false,
                    },
                    compress: {
                        // 在UglifyJs删除没有用到的代码时不输出警告
                        warnings: false,
                        // 删除所有的 `console` 语句，可以兼容ie浏览器
                        drop_console: true,
                        // 内嵌定义了但是只用到一次的变量
                        collapse_vars: true,
                        // 提取出出现多次但是没有定义成变量去引用的静态值
                        reduce_vars: true,
                    }
                },
            }),
        ],
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