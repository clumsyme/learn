var feeds = document.getElementsByClassName('feed-item')
function getElementTop(element){
　　　　var actualTop = element.offsetTop;
　　　　var current = element.offsetParent;
　　　　while (current !== null){
　　　　　　actualTop += current.offsetTop;
　　　　　　current = current.offsetParent;
　　　　}
　　　　return actualTop;
}
function scrollToElement(element){
    var eleTopPos = getElementTop(element)
    window.scrollTo(0, eleTopPos)
}
for (var i=0, len=feeds.length; i<len; i++){
    var nextButton = document.createElement("button")
    nextButton.style.cssText = "position:fixed; left:581px; bottom:100px; height:30px; width:50px; color:blue"
    nextButton.innerHTML = "next"
    var nextFeed = feeds[i+1]
    nextButton.onclick = function(){
        scrollToElement(nextFeed)
    }
    feeds[i].appendChild(nextButton)
}