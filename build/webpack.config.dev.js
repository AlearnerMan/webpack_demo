const webpack = require("webpack")
const {merge} = require("webpack-merge")
const baseConfig = require("./webpack.config.common")
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = merge(baseConfig,{
    mode:"development",
    devtool:"source-map",// cheap-inline-source-map 指的是不精确到列，只精确到行
    devServer:{
        contentBase:"./bundle",
        open:true,
        hot:true,
        // hotOnly:true,
        proxy:{// 配置代理 http://localhost:8080/api的时候 
            "/api":"http://localhost:3000"
        }
    },
    module:{
        rules:[
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
                
            }
        ]
    },
    plugins:[
        new webpack.NamedChunksPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new BundleAnalyzerPlugin()
    ]
})