# 笔记




## postcss-loader 的作用：
 是可以给css3的新属性加上前缀

 问题：
  1. 当使用@import语法引用less文件的时候不能够添加前缀

## css-loader 中options中的importLoader属性指的是啥意思？
 css-loader 是用来处理import和@import等引用css的语法的 ，但是在css中使用@import语法的时候 需要先把引用的样式文件经过其他loader处理才能合并到文件中，这个时候需要这个属性

##  @import 引入less文件 里面的新语法没有经过postcss-loader处理的解决方法
把less-loader放到最下面来处理代码，，就是挪一下位置，具体为什么不可以 我也不知道。。


## webpack-dev-middleware是干啥用的呢？


## node API 
 在nodo文件中使用webpack打包 ： api->node API里面的 

## webpack-dev-server 
 会把代码放到内存里面 提升编译的速度

## HMR 热更新模块的配置 
devServer{
  hot:true,
  hotOnly:true
}

## babel 
npm install babel-loader @babel-core

 rules: 增加  这样写的话 一点作用都没有的。。（没有处理任何代码）。需要加上 @babel/preset-env插件才会生效 
 @babel/preset-env 包含这一些比较新的语法 let 箭头函数等，
 @babel/polyfill 提供一些promise/新的方法等一些内容等等 ; d但是他是通过全局注入的方式（定义全局变量的方式，会污染全局环境）把浏览器不支持的函数添加到代码中的 
 @babel/babel-plugin-transform-runtime  这个插件呢就是把polyfill中的全局变量的方式转化成局部的变量方式 不会影响全局的环境

 {
   test:/\.js$/,
   use:{
     loader:"babel-loader",
     exculde:/node_module/,
     options:{
       presets:[
       ]
     }
   }
 }

 ## tree shaking 
 只支持esmodule的模块引入
## splitChunks webpack拆分chunk配置
splitChunks: {
    chunks: "async",
    minSize: 30000,
    minChunks: 1,
    maxAsyncRequests: 5,
    maxInitialRequests: 3,
    automaticNameDelimiter: '~',
    name: true,
    cacheGroups: {
        vendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10
        },
    default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true
        }
    }
}


## new Webpack.ProvidePlugin() 自动加载模块，而不必到处 import 或 require 。


可以添加映射模块中没有引用的包引用 

new

## externals   设置外部引用，打包的时候不打包进去

##PWA 本地缓存

## eslint-loader 可以用来提示eslint报错


## devServer 

overlay:true 这个选项就是控制页面中的运行的时候有报错的时候直接显示在页面中提示

## babel-loader 中的 exclude选项
import _ from "lodash"  ?这种情况如果不加exclude的话 会通过babel-loader转义吗？
import _ from "node_module/abc/index.js"