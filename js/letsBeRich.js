// ==UserScript==
// @name         letsBeRich
// @version      0.1
// @description  We're gonna be rich. ﾚ(ﾟ∀ﾟ;)ﾍ
// @author       yan
// @match        https://my.alipay.com/*
// ==/UserScript==

window.onload = function(){
    var money = document.getElementsByClassName('i-assets-balance-amount')[0]
    money.childNodes[1].childNodes[0].nodeValue = 88888888
    money.childNodes[1].childNodes[1].innerHtml = '.88'
}