// import "@babel/polyfill";
import fff from "./content.js"

import Logo from "./logo.png"

import "./css/index.less"

// import _ from "lodash"



function getComponent(){
    return import(/* webpackChunkName:"lodash"*/"lodash").then(({default:_})=>{
        var ele = document.createElement("div")
        ele.innerHTML = _.join(["hello ","world"],"-")
        return ele
    })
}

getComponent().then(ele=>{
    document.body.appendChild(ele)
})

// console.log(_.join(["a","b","c"]))
var root = document.getElementById("root")

// var header = document.createElement("div")
// header.innerHTML="header"

fff()

// if(module.hot){
//     module.hot.accept("./content.js",()=>{
//         console.log("我只会更新content.js 文件的")
//         // 这里就是监听content文件中发生改变的时候去执行下面的函数
//         // 事实证明没啥软用。。。。
//         fff()
//     })
// }

function createSingleElement(tag,content){
    var element = null
    return function(){
        element = document.createElement(tag)
        return setContent[tag](element,content)
    }
}

const setContent = {
    img:function(ele,content){
        ele.src = content
        return ele
    },
    div:function(ele,content){
        ele.innerHTML = content
        return ele
    }
}

// function setContent_image(ele,content){
//     ele.src = content
//     return ele
// }

// function setContent_div(ele,content){
//    ele.innerHTML = content
//    return ele
// }

// function createImgElement(img){
//     let element = null
//     return function(){
//         if(!element) element = document.crea
//     }
// }
const aaa = [
    new Promise(()=>{}),
    new Promise(()=>{})
]

var header = createSingleElement("div","header")
var content = createSingleElement("div","content")
var Image = createSingleElement("img",Logo)
root.append(new header())
root.append(new content())
root.append(new Image())
