const path  = require("path")

module.exports ={
    entry:"./src/index.js",
    output:{
        filename:"bundle.js",
        path:path.resolve(__dirname,"dist"),
        library:"library",// 通过script标签引入我的文件 ，然后对应的全局变量叫做library
        libraryTarget:"umd" // 不管通过什么方式去饮用的时候都可以使用我的库 （import/require/define）
    }
}