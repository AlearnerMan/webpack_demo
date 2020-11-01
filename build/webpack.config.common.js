const path = require('path')
const HtmlWebpackPlugin = require("html-webpack-plugin")
const {CleanWebpackPlugin} = require("clean-webpack-plugin")

module.exports = {
    entry:{
        main:path.resolve(__dirname,"../src/index.js"),
        // sub:"./src/index.js"
    },
    output:{
        filename:"[name]-[contenthash].js",
        chunkFilename:"[name]-[contenthash].js",
        path:path.resolve(__dirname,'../bundle'),
        publicPath:"/"
    },
    module:{
        rules:[
            {
                test:/\.js$/,
                exclude:/node_module/,
                use:{
                    loader:"babel-loader", // 处理图片文件 
                    options:{
                        // "presets":[["@babel/preset-env",{
                        //     useBuiltIns: 'usage',
                        //     targets:{
                        //         chrome:"34"
                        //     }
                        // }]],
                        "plugins":[
                            ["@babel/plugin-transform-runtime",{
                                "corejs":3
                            }]
                        ]
                    }
                },
                
            },
            {
                test:/.(jpg|png|gif)$/,
                use:{// url-loader 和 file-loader的区别？？url-loader可以使用file-loader的所以功能，但是多了一个转化小文件为base64的功能
                    loader:"file-loader", // 处理图片文件 
                    options:{
                        // placeholder 占位符
                        name: 'images/[name].[ext]',
                        // outputPath:"images",
                        // publicPath:"assets",// "assets/images/logo.png"; 这个选项是在output上一级的选项默认应该
                        limit:2048
                    }
                },
                
            },
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:path.resolve(__dirname,"../index.html")
        }),
        new CleanWebpackPlugin(),
    ],
    
}