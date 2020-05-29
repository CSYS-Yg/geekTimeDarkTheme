// ==UserScript==
// @name         极客时间仿 VSCode 主题
// @version      1.0.0.0
// @author       Yx_yuguang
// @match        https://time.geekbang.org/column/article/*
// @grant        none
// ==/UserScript==


// 配置项
// https://gitee.com/Yx_z/figurebed/raw/master/vscode/vscode-bg.png
var config = {
    // 延时时间（单位/秒）
    timeDelay: 2,

    //背景（图床地址）
    bg: '',
    //背景颜色
    bgColor: '#121212',

    // 内容字体颜色
    contentColor: '#dcdcdc',
    // 加粗字体颜色
    boldColor: '#ffffff',
    // 小标题颜色
    headColor: '#ffffff',

    // 文中音频背景色
    contentVideoColor: '#1d1d1c',
    // 文中音频边框色
    contentVideoBorder: '1px solid #2e2d2d',

    // 代码块字体色
    codeColor: '#7f7f7f',
    // 代码块背景色
    codeBgColor: '#1f2021',
    // 代码块边框属性
    codeBorder: '1px solid #2b2c2f'

    // 必须
    // 非必须
    // 左右按钮切换背景色 #f6f7f9 color #999 border 1px solid #f6f7f9
    // 小播放器背景色与边框色 边框 1px solid #f0f0f0
    // 退出沉浸模式阅读背景色   #f6f7f9
    // 作者回复 字体 #505050 bg #f6f7fb
}

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

    }, config.timeDelay * 1000)
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
    // 设置文中普通字体颜色
    setContentColor()
    // 内容属性设置
    contentStyle()
}

// 设置背景图片
function setBgImage(image) {
    if (config.bg) {
        bgImageDom.style.backgroundImage = "url(" + config.bg + ")";//设置背景图的的地址
        bgImageDom.style.backgroundRepeat = "no-repeat";//设置背景不平铺
        bgImageDom.style.backgroundPosition = "center";//设置背景图的位置
        bgImageDom.style.backgroundSize = "auto";//设置背景图像的尺寸
    } else {
        bgImageDom.style.backgroundColor = config.bgColor
    }

}

// 隐藏设置背景图后的出现的白边
function hideWhiteBorder() {
    let topBorderDom = appDom.children[0].children[1].children[0]
    let leftBorderDom = appDom.children[0].children[0]
    topBorderDom.style.height = '60px'
    leftBorderDom.style.width = '379px'
}

// 首尾图片隐藏
function hideImages() {
    // 隐藏文中首页与末尾图片
    contentDom.children[0].style.display = "none"
    contentDom.children[contentDom.children.length - 2].style.display = "none"
}

// 设置音频属性
function setVideoStyle() {
    let videoDom = contentDom.children[1]
    videoDom.style.backgroundColor = config.contentVideoColor
    videoDom.style.border = config.contentVideoBorder
}

// 设置文字字体颜色
function setContentColor() {
    // 文本内字体节点
    let fontDom = contentDom.children[2].children[0].children[0].children[0]
    fontDom.style.color = config.contentColor
}

// 内容属性设置
function contentStyle() {
    // 获取代码块节点
    let preList = contentDom.querySelectorAll('[data-slate-type="pre"]')
    // 获取加粗字体节点
    let boldList = contentDom.querySelectorAll('[data-slate-type="bold"]')
    // 获取文中小标题
    let headingList = contentDom.querySelectorAll('[data-slate-type="heading"]')

    // 遍历设置属性
    preList.forEach(item => {
        item.style.backgroundColor = config.codeBgColor
        item.style.color = config.codeColor
        item.style.border = config.codeBorder
    });

    boldList.forEach(item => {
        item.style.color = config.boldColor
    });

    headingList.forEach(item => {
        item.style.color = config.headColor
    });
}