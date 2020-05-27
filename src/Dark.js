// ==UserScript==
// @name         极客时间仿 VSCode 主题
// @version      1.0.0.0
// @author       Yx_yuguang
// @match        https://time.geekbang.org/column/article/*
// @grant        none
// ==/UserScript==

// background-image: url(https://gitee.com/Yx_z/figurebed/raw/master/vscode/VsCode.jpg);


// 配置项

var config = {
    //背景（图床地址）
    bg: 'https://gitee.com/Yx_z/figurebed/raw/master/vscode/vscode-bg.png',
    // 延时时间（单位/秒）
    timeDelay: 2
    // 必须
    // 文中主要内容字体颜色
    // 文中小标题颜色
    // 文中代码块背景色与边框色
    // 文中加粗字体颜色
    // 非必须
    // 左右按钮切换背景色
    // 播放器背景色与边框色
    // 小播放器背景色与边框色
    // 退出沉浸模式阅读背景色
}
// 背景图片（图床地址）
var bg = 'https://gitee.com/Yx_z/figurebed/raw/master/vscode/vscode-bg.png'

// 设置延时时间（单位/秒）
var timeDelay = 2


// immerseDom 沉浸点击 dom
// bgImageDom 背景图片 dom
// contentDom 内容节点 dom
var appDom, immerseDom, bgImageDom, contentDom

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
        // 内容节点
        contentDom = bgImageDom.children[0].children[0].children[0].children[0].children[2]

    }, timeDelay * 1000)
}

function immerseClick() {
    appDom.webkitRequestFullScreen();
    // 设置背景图片
    setBgImage()
    // 隐藏设置背景图后的出现的白边
    hideWhiteBorder()
    // 隐藏文中首页与末尾图片
    hideImages()
    // 设置音频属性
    setVideoStyle()
    // 找出多个代码块文本节点
    getPre()
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
    bgImageDom.style.backgroundSize = "auto";//设置背景图像的尺寸
}

// 隐藏设置背景图后的出现的白边
function hideWhiteBorder() {
    let topBorderDom = appDom.children[0].children[1].children[0]
    let leftBorderDom = appDom.children[0].children[0]
    topBorderDom.style.height = '60px'
    leftBorderDom.style.width = '379px'
}

// 隐藏文中首页与末尾图片
function hideImages() {
    contentDom.children[0].style.display = "none"
    contentDom.children[contentDom.children.length - 2].style.display = "none"
}

// 设置音频属性
function setVideoStyle() {
    let videoDom = contentDom.children[1]
    videoDom.style.backgroundColor = '#282c34'
    videoDom.style.border = '1px solid #282c34'
}

// 找出多个代码块文本节点
function getPre() {
    let preList = contentDom.querySelectorAll('[data-slate-type="pre"]')
    preList.forEach(item => {
        item.style.backgroundColor = '#282c34'
    });
}