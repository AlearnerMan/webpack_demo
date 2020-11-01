const path = require('path')
const HtmlWebpackPlugin = require("html-webpack-plugin")
const {CleanWebpackPlugin} = require("clean-webpack-plugin")
const webpack = require("webpack")
module.exports = {
    mode:"development",
    devtool:"source-map",// cheap-inline-source-map 指的是不精确到列，只精确到行
    entry:{
        main:"./src/index.js",
        // sub:"./src/index.js"
    },
    devServer:{
        contentBase:"./bundle",
        open:true,
        hot:true,
        // hotOnly:true,
        proxy:{// 配置代理 http://localhost:8080/api的时候 
            "/api":"http://localhost:3000"
        }
    },
    output:{
        filename:"[name].js",
        path:path.resolve(__dirname,'./bundle'),
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
            {
                test:/.less$/,
                // postcss-loader 是用来添加css新属性的前缀的
                use:["style-loader",
                    // "css-loader",
                    {
                        loader:"css-loader",
                        options:{
                            // importLoaders:2
                        }
                    },
                    "less-loader",
                    {
                        loader:"postcss-loader",
                        options:{
                            postcssOptions:{
                                plugins:[
                                        "autoprefixer"
                                ]
                            }
                        }
                    }
                ],
                
            },
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:"./index.html"
        }),
        new CleanWebpackPlugin(),
        new webpack.NamedChunksPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ]
}