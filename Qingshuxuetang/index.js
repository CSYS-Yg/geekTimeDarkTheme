// ==UserScript==
// @name           青书学院刷课脚本
// @description    长沙医学院刷课
// @author         YuGuang
// @contributor    Rhilip
// @connect        *
// @grant          GM_xmlhttpRequest
// @grant          GM_setClipboard
// @grant          GM_addStyle
// @grant          GM_setValue
// @grant          GM_getValue
// @grant          GM_listValues
// @grant          GM_deleteValue
// @grant          GM_registerMenuCommand
// @include        https://degree.qingshuxuetang.com/csyxy/Student/*
// @version        0.0.0.1.
// @icon           https://img3.doubanio.com/favicon.ico
// @run-at         document-end
// @namespace      doveboy_js
// ==/UserScript==

// This Userscirpt can't run under Greasemonkey 4.x platform

window.onload = function () {
    // 获取课程信息
    let courseInfo = {
        teachPlanId: getUrlParam('teachPlanId'),
        periodId: getUrlParam('periodId'),
        courseId: getUrlParam('courseId'),
        cw_nodeId: getUrlParam('cw_nodeId'),
        category: getUrlParam('category'),
    }
    // 获取当前的 url
    let newUrl = window.location.href
    // 下一节 URl
    let nextUrl = ''
    // 获取当前跳转列表信息
    let courseList = document.getElementById('lessonList').getElementsByTagName('a')
    if (courseList.length > 0) {
        console.log('加载成功')
    } else {
        console.log('加载失败，请刷新页面')
    }
    let courseHrefList = []
    for (let i = 0; i < courseList.length; i++) {
        if (courseList[i].href == 'javascript: void(null)') {
            continue
        } else {
            let str = courseList[i].href.match(/'(\S*)'/)[1];
            let courseUrl = window.location.origin + window.location.pathname + '?teachPlanId=' + courseInfo.teachPlanId + '&periodId=' + courseInfo.periodId + '&courseId=' + courseInfo.courseId + '&cw_nodeId=' + str + '&category=' + str.split('_')[0]
            courseHrefList.push(courseUrl)
        }
    }

    for (let i = 0; i < courseHrefList.length; i++) {
        if (courseHrefList[i] == newUrl) {
            if (i + 1 == courseHrefList.length) {
                nextUrl = "complete"
            } else {
                nextUrl = courseHrefList[i + 1]
            }
        } else if (i == courseHrefList.length - 1 && nextUrl == '') {
            window.location.href = courseHrefList[i]
        }
    }

    let iframeDom = document.getElementById('playerContainer').getElementsByTagName('iframe')
    if (iframeDom.length > 0) {
        setTimeout(() => {
            window.location.href = nextUrl
        }, 5000)
    } else {
        // 获取当前 video dom
        let videoDom = document.getElementById('playerContainer').getElementsByTagName('video')[0]
        // 检测视频播放是否已经结束
        let endedTime = setInterval(() => {
            // 每两分钟检查一次
            if (videoDom.ended) {
                clearInterval(endedTime)
                if (nextUrl != 'complete') {
                    window.location.href = nextUrl
                }
            }
        }, 1000 * 60);
        // 5s 后开始自动播放
        setTimeout(() => {
            videoDom.play()
            videoDom.playbackRate = 2;
            endedTime
        }, 5000)
    }

}

// 获取 URL 指定参数
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        //return unescape(r[2]);
        return r[2];
    }
    return null;
}
