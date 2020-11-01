const webpack = require("webpack")
const {merge} = require("webpack-merge")
const baseConfig = require("./webpack.config.common")
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

// pwa插件
const WorkboxPlugin = require("workbox-webpack-plugin")

module.exports = merge(baseConfig,{
    mode:"production",
    module:{
        rules:[
            {
                test:/.less$/,
                // postcss-loader 是用来添加css新属性的前缀的
                use:[
                    MiniCssExtractPlugin.loader,
                    // "css-loader",
                    {
                        loader:"css-loader",
                        options:{
                            importLoaders:2
                        }
                    },
                    
                    {
                        loader:"postcss-loader",
                        options:{
                            postcssOptions:{
                                plugins:[
                                        "autoprefixer"
                                ]
                            }
                        }
                    },
                    "less-loader",
                ],
                
            }
        ]
    },
    plugins:[
        // new BundleAnalyzerPlugin(),
        new MiniCssExtractPlugin(),
        new WorkboxPlugin.GenerateSW({
            clientsClaim:true,
            skipWaiting:true
        })
    ],
    optimization:{
        // runtimeChunk: {
        //     name: entrypoint => `runtime~${entrypoint.name}`
        //   },
        minimizer: [// 压缩css文件
            new CssMinimizerPlugin(),
        ],
        splitChunks: {
            chunks: "all",// 只对异步加载的模块生效
            minSize: 30000,// 大于这个就被分割
            minChunks: 1,// 被引用多少次
            maxAsyncRequests: 5,// 最多同时加载5个请求
            maxInitialRequests: 3,// 最多同步加载的请求（入口文件最多三个）
            automaticNameDelimiter: '-',
            name: true,
            cacheGroups: {// 应该是有同步加载的模块才会去这个里面进行处理的
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    // cacheGroupKey here is `commons` as the key of the cacheGroup
                    name(module, chunks, cacheGroupKey) {
                      const moduleFileName = module.identifier().split('/').reduceRight(item => item);
                      const allChunksNames = chunks.map((item) => item.name).join('~');
                      return `${cacheGroupKey}-${allChunksNames}-${moduleFileName}`;
                    },
                    chunks: 'all',
                    priority:0
                  },
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,// 优先级（缓存组中符合多个规则的话 就通过这个来判断放到哪里去的）
                    // filename:"[name]"
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true  // 如果一个模块被打包过了 就不再加到default里面了 直接引用就好了 不再重新打包了
                }
            }
        }
    }
})