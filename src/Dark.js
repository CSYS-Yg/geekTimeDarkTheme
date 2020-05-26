// ==UserScript==
// @name         极客时间仿 VSCode 主题
// @version      1.0.0.0
// @author       Yx_yuguang
// @match        https://time.geekbang.org/column/article/*
// @grant        none
// ==/UserScript==

// background-image: url(https://gitee.com/Yx_z/figurebed/raw/master/vscode/VsCode.jpg);

// 配置项
// 背景图片（图床地址）
var bg = 'https://gitee.com/Yx_z/figurebed/raw/master/vscode/VsCode.jpg'
// 设置延时时间（单位/秒）
var timeDelay = 2


// immerseDom 沉浸点击 dom
// bgImageDom 背景图片 dom
var appDom, immerseDom, bgImageDom

// 网页加载完成，获取页面 dom 节点
window.onload = function () {
    // 内容加载会有延时
    setTimeout(() => {
        // app dom 节点
        appDom = document.getElementById('app')
        // 沉浸事件节点
        immerseDom = appDom.children[0].children[1].children[2].children[2]
        // 添加沉浸点击监控
        immerseDom.addEventListener('click', immerseClick);
        // 设置可开启提示
        immerseDom.title = "点击开启背景切换"
        // 背景图片节点
        bgImageDom = appDom.children[0].children[1].children[1].children[0].children[0].children[1]
    }, timeDelay * 1000)
}

function immerseClick() {
    appDom.webkitRequestFullScreen();
    // 设置背景图片
    setBgImage()
    // 隐藏设置背景图后的出现的白边
    hideWhiteBorder()
}

// 设置背景图片
function setBgImage(image) {
    let imageUrl
    if (!image) {
        imageUrl = bg
    } else {
        imageUrl = image
    }
    bgImageDom.style.backgroundImage = "url(" + imageUrl + ")";//设置背景图的的地址
    bgImageDom.style.backgroundRepeat = "no-repeat";//设置背景不平铺
    bgImageDom.style.backgroundPosition = "center";//设置背景图的位置
    bgImageDom.style.backgroundSize = "cover";//设置背景图像的尺寸
}

// 隐藏设置背景图后的出现的白边
function hideWhiteBorder() {
    let topBorderDom = appDom.children[0].children[1].children[0]
    let leftBorderDom = appDom.children[0].children[0]
    topBorderDom.style.height = '60px'
    leftBorderDom.style.width = '379px'
}